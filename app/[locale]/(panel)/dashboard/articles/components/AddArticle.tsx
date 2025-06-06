import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 type Blog,
 type BlogCategory,
 type Tag,
 createBlog,
 updateBlog,
 getTags,
 getBlogTags,
 getBlogImages,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { addArticleSchema, type AddArticleSchema } from '../schemas/addArticle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AxiosError } from 'axios';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
type Props = {
 open: boolean;
 article: Blog | null;
 articleCategories: BlogCategory[];
 defaultCategory: AddArticleSchema['category'] | null;
 onClose: () => void;
};

export default function AddArticle({
 open,
 article,
 articleCategories,
 onClose,
 defaultCategory,
}: Props) {
 const [tagOnce, setTagOnce] = useState(false);
 const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { articles, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   articles: Dic;
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
  };
 const queryClient = useQueryClient();

 const {
  data: tags = [],
  isLoading: isLoadingTags,
  isFetching: isFetchingTags,
 } = useQuery({
  queryKey: ['tags', article?.id],
  queryFn: async () => {
   const result = await getTags({
    locale,
    tagTypeID: 1,
   });
   const tags = result.data.payload.Tags;
   if (article && article.id && !tagOnce) {
    const result = await getBlogTags({
     locale,
     blogID: article!.id,
    });
    const blogTags = result.data.payload.BlogTags;
    setSelectedTags(
     tags.filter((item) => blogTags.some((b) => b.tagID === item.id))
    );
    setTagOnce(true);
   }
   return tags;
  },
 });

 const { mutate: mutateTag, isPending: isCreating } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'articles'],
   });
   enqueueSnackbar({
    message: changesSavedSuccessfully as string,
    variant: 'success',
   });
   onClose();
  },
  onError(erro: AxiosError) {
   enqueueSnackbar({
    message: (erro.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
  async mutationFn(data: AddArticleSchema) {
   const tagBlogs = selectedTags.map((item) => ({
    blogID: article?.id || 0,
    tagID: item.id,
    lang: locale,
   }));
   let blogImage: { imageUrl: string; blogID: number } | null = null;
   if (article && article.id) {
    blogImage = await getBlogImages({
     locale,
     blogID: article?.id || 0,
    }).then((res) => res.data.payload.BlogImages[0]);
   }
   const newBlog = {
    locale,
    blogCategoryID: Number(data.category.id),
    header: data.title,
    description: data.description,
    body: article?.body || '',
    blogTags: tagBlogs,
    blogImage: blogImage,
   };
   return article
    ? updateBlog({
       id: article.id,
       ...newBlog,
       blogStateID: article.blogStateID,
       showForCard: article.showForCard,
       blogImage: blogImage
        ? {
           ...blogImage,
           lang: locale,
          }
        : undefined,
      })
    : createBlog(newBlog);
  },
 });
 const {
  control,
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<AddArticleSchema>({
  resolver: zodResolver(addArticleSchema),
  defaultValues: {
   title: '',
  },
 });

 useEffect(() => {
  setTagOnce(false);
  setSelectedTags([]);
  if (article) {
   setValue('title', article.header);
   setValue('description', article.description);
   setValue('category', {
    id: article.blogCategoryID.toString(),
    name: article.blogCategoryName,
   });
  } else {
   const activeCategory = defaultCategory || articleCategories[0];
   setValue('title', '');
   setValue('description', '');
   if (activeCategory) {
    setValue('category', {
     id: activeCategory.id.toString(),
     name: activeCategory.name,
    });
   }
  }
 }, [article, articleCategories, setValue, open, defaultCategory]);

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='sm'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
    handleSubmit((data) => {
     mutateTag(data);
    })();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>
      {article
       ? (articles.editArticle as string)
       : (articles.addArticle as string)}
     </span>
     <IconButton loading={isCreating} color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='grid gap-4'>
     <Controller
      control={control}
      name='category'
      render={({ field }) => (
       <Autocomplete
        {...field}
        disableClearable={true}
        value={field.value || null}
        onChange={(_, newValue) => field.onChange(newValue)}
        size='small'
        options={articleCategories.map((item) => ({
         id: item.id.toString(),
         name: item.name,
        }))}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
         <TextField
          {...params}
          label={articles.category as string}
          error={!!errors.category}
          required
         />
        )}
       />
      )}
     />
     <TextField
      size='small'
      label={articles.articleTitle as string}
      {...register('title')}
      error={!!errors.title}
      helperText={errors.title?.message}
      required
     />
     <Autocomplete
      multiple
      loading={isLoadingTags || isFetchingTags}
      size='small'
      value={selectedTags}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => setSelectedTags(newValue)}
      getOptionLabel={(option) => option.name}
      options={tags}
      renderInput={(params) => (
       <TextField {...params} label={articles.tags as string} />
      )}
      renderOption={(props, option, { selected }) => {
       const { key, ...optionProps } = props;
       return (
        <li key={key} {...optionProps}>
         <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
         />
         {option.name}
        </li>
       );
      }}
     />
     <TextField
      size='small'
      multiline
      rows={5}
      label={articles.description as string}
      {...register('description')}
      error={!!errors.description}
      helperText={errors.description?.message}
      required
     />
    </div>
   </DialogContent>
   <DialogActions>
    <Button
     loading={isCreating}
     className='w-[6rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
    >
     {articles.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating || isFetchingTags || isLoadingTags}
    >
     {articles.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
