import { useEffect } from 'react';
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
 createBlog,
 updateBlog,
} from '@/services/api-actions/globalApiActions';
import { addArticleSchema, type AddArticleSchema } from '../schemas/addArticle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';

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
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { articles } = useWebsiteDictionary() as {
  articles: Dic;
 };
 const queryClient = useQueryClient();

 const { mutate: mutateTag, isPending: isCreating } = useMutation({
  async mutationFn(data: AddArticleSchema) {
   try {
    const result = article
     ? await updateBlog({
        id: article.id,
        locale,
        blogCategoryID: Number(data.category.id),
        header: data.title,
        description: data.description,
        body: article.body,
       })
     : await createBlog({
        locale,
        blogCategoryID: Number(data.category.id),
        header: data.title,
        description: data.description,
       });
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
     loading={isCreating}
    >
     {articles.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
