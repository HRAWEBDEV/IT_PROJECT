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
 type BlogCategory,
 createBlogCategory,
 updateBlogCategory,
} from '@/services/api-actions/globalApiActions';
import {
 type AddCategorySchema,
 addCategorySchema,
} from '../schemas/addCategory';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';

type Props = {
 open: boolean;
 category: BlogCategory | null;
 onClose: () => void;
};

export default function AddCategory({ open, category, onClose }: Props) {
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { articlesCategories } = useWebsiteDictionary() as {
  articlesCategories: Dic;
 };
 const queryClient = useQueryClient();

 const { mutate: mutateCategory, isPending: isCreating } = useMutation({
  mutationFn: async (data: AddCategorySchema) => {
   try {
    const result = category
     ? await updateBlogCategory({
        locale,
        name: data.title,
        description: data.description,
        id: category.id,
       })
     : await createBlogCategory({
        locale,
        name: data.title,
        description: data.description,
       });
    queryClient.invalidateQueries({
     queryKey: ['dashboard', 'articlesCategories'],
    });
    onClose();
    return result;
   } catch {
    enqueueSnackbar({
     message: articlesCategories.errorTryAgainLater as string,
     variant: 'error',
    });
   }
  },
 });
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<AddCategorySchema>({
  resolver: zodResolver(addCategorySchema),
  defaultValues: {
   title: '',
   description: '',
  },
 });

 useEffect(() => {
  if (category) {
   setValue('title', category.name);
   setValue('description', category.description);
  } else {
   setValue('title', '');
   setValue('description', '');
  }
 }, [category, setValue, open]);

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
     mutateCategory(data);
    })();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>
      {category
       ? (articlesCategories.editCategory as string)
       : (articlesCategories.addCategory as string)}
     </span>
     <IconButton loading={isCreating} color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='mb-4'>
     <TextField
      fullWidth
      size='small'
      {...register('title')}
      label={articlesCategories.categoryTitle as string}
      error={!!errors.title}
      helperText={errors.title?.message}
      required
     />
    </div>
    <TextField
     fullWidth
     multiline
     rows={8}
     size='small'
     {...register('description')}
     label={articlesCategories.description as string}
     error={!!errors.description}
     helperText={errors.description?.message}
     required
    />
   </DialogContent>
   <DialogActions>
    <Button
     loading={isCreating}
     className='w-[6rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
    >
     {articlesCategories.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating}
    >
     {articlesCategories.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
