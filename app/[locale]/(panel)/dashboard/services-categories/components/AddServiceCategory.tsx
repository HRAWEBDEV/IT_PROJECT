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
 type ServiceCategory,
 createServiceCategory,
 updateServiceCategory,
} from '@/services/api-actions/globalApiActions';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import {
 type AddCategorySchema,
 addCategorySchema,
} from '../schemas/addCategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from './AddIcon';

type Props = {
 open: boolean;
 category: ServiceCategory | null;
 onClose: () => void;
};

export default function AddCategory({ open, category, onClose }: Props) {
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const [iconsSvg, setIconsSvg] = useState<string>('');
 const [showAddIcon, setShowAddIcon] = useState(false);
 const { servicesCategories, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   servicesCategories: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };
 const queryClient = useQueryClient();

 const { mutate: mutateCategory, isPending: isCreating } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'servicesCategories'],
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
    svgUrl: iconsSvg || null,
   };
   return category
    ? updateServiceCategory(newCategory)
    : createServiceCategory(newCategory);
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
   setIconsSvg(category.svgUrl || '');
  } else {
   setValue('title', '');
   setValue('description', '');
   setIconsSvg('');
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
       ? (servicesCategories.editCategory as string)
       : (servicesCategories.addCategory as string)}
     </span>
     <IconButton loading={isCreating} color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    {iconsSvg && (
     <div className='flex items-center justify-center mb-4 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 text-neutral-500 dark:text-neutral-400 relative'>
      <i className={`${iconsSvg} text-[4rem]`}></i>
      <div className='absolute top-0 end-0'>
       <IconButton onClick={() => setIconsSvg('')}>
        <DeleteIcon color='error' />
       </IconButton>
      </div>
     </div>
    )}
    <div className='mb-4'>
     <div className='flex gap-2'>
      <TextField
       className='flex-grow'
       size='small'
       {...register('title')}
       label={servicesCategories.categoryTitle as string}
       error={!!errors.title}
       helperText={errors.title?.message}
       required
      />
      <Button variant='outlined' onClick={() => setShowAddIcon(true)}>
       {servicesCategories.addIcon as string}
      </Button>
     </div>
    </div>
    <TextField
     fullWidth
     multiline
     rows={8}
     size='small'
     {...register('description')}
     label={servicesCategories.description as string}
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
     {servicesCategories.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating}
    >
     {servicesCategories.save as string}
    </Button>
   </DialogActions>
   <AddIcon
    open={showAddIcon}
    onClose={() => setShowAddIcon(false)}
    setIcon={setIconsSvg}
   />
  </Dialog>
 );
}
