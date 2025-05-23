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
 type ProjectCategory,
 createProjectCategory,
 updateProjectCategory,
} from '@/services/api-actions/globalApiActions';
import {
 type AddCategorySchema,
 addCategorySchema,
} from '../schemas/addProject';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

type Props = {
 open: boolean;
 category: ProjectCategory | null;
 onClose: () => void;
};

export default function AddCategory({ open, category, onClose }: Props) {
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { projectsCategories, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   projectsCategories: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };
 const queryClient = useQueryClient();

 const { mutate: mutateCategory, isPending: isCreating } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'projectsCategories'],
   });
   enqueueSnackbar({
    message: changesSavedSuccessfully,
    variant: 'success',
   });
   onClose();
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
  mutationFn: async (data: AddCategorySchema) => {
   const newCategory = {
    id: category?.id || 0,
    locale,
    name: data.title,
    description: data.description,
   };
   return category
    ? updateProjectCategory(newCategory)
    : createProjectCategory(newCategory);
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
       ? (projectsCategories.editCategory as string)
       : (projectsCategories.addCategory as string)}
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
      label={projectsCategories.categoryTitle as string}
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
     label={projectsCategories.description as string}
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
     {projectsCategories.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating}
    >
     {projectsCategories.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
