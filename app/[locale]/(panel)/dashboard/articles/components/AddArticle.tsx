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
 //  createTag,
 //  updateTag,
} from '@/services/api-actions/globalApiActions';
import { addArticleSchema, type AddArticleSchema } from '../schemas/addArticle';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
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
 //  const { enqueueSnackbar } = useSnackbar();
 //  const { locale } = useAppConfig();
 const { articles } = useWebsiteDictionary() as {
  articles: Dic;
 };
 //  const queryClient = useQueryClient();

 const { mutate: mutateTag, isPending: isCreating } = useMutation({
  mutationFn: async (data: AddArticleSchema) => {
   // try {
   //  const result = tag
   //   ? await updateTag({
   //      locale,
   //      name: data.title,
   //      tagTypeID: Number(data.category.id),
   //      id: tag.id,
   //     })
   //   : await createTag({
   //      locale,
   //      name: data.title,
   //      tagTypeID: Number(data.category.id),
   //     });
   //  queryClient.invalidateQueries({
   //   queryKey: ['dashboard', 'tags'],
   //  });
   //  onClose();
   //  return result;
   // } catch {
   //  enqueueSnackbar({
   //   message: tags.errorTryAgainLater as string,
   //   variant: 'error',
   //  });
   // }
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
  } else {
   if (!articleCategories.length) return;
   setValue('title', '');
  }
 }, [article, articleCategories, setValue, open]);

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='xs'
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
   <DialogContent dividers></DialogContent>
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
