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

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

type Props = {
 open: boolean;
 article: Blog | null;
 articleCategories: BlogCategory[];
 onClose: () => void;
};

export default function AddArticle({
 open,
 article,
 articleCategories,
 onClose,
}: Props) {
 const [tagOnce, setTagOnce] = useState(false);
 const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { articles } = useWebsiteDictionary() as {
  articles: Dic;
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
  async mutationFn(data: AddArticleSchema) {
   const tagBlogs = selectedTags.map((item) => ({
    blogID: article?.id || 0,
    tagID: item.id,
    lang: locale,
   }));
   const newBlog = {
    locale,
    blogCategoryID: Number(data.category.id),
    header: data.title,
    description: data.description,
    body: article?.body || '',
    blogTags: tagBlogs,
   };
   try {
    const result = article
     ? await updateBlog({
        id: article.id,
        ...newBlog,
       })
     : await createBlog(newBlog);
    queryClient.invalidateQueries({
     queryKey: ['dashboard', 'articles'],
    });
    onClose();
    return result;
   } catch {
    enqueueSnackbar({
     message: articles.errorTryAgainLater as string,
     variant: 'error',
    });
   }
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
   if (!articleCategories.length) return;
   setValue('title', '');
   setValue('description', '');
   setValue('category', {
    id: articleCategories[0].id.toString(),
    name: articleCategories[0].name,
   });
  }
 }, [article, articleCategories, setValue, open]);

 useEffect(() => {
  console.log(tags);
 }, [tags]);

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
