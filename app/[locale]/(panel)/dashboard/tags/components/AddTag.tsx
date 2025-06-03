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
 type Tag,
 type TagCategory,
 createTag,
 updateTag,
} from '@/services/api-actions/globalApiActions';
import { addTagSchema, type AddTagSchema } from '../schemas/addTag';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

type Props = {
 open: boolean;
 tag: Tag | null;
 tagCategories: TagCategory[];
 defaultCategory: AddTagSchema['category'] | null;
 onClose: () => void;
};

export default function AddTag({
 open,
 tag,
 tagCategories,
 onClose,
 defaultCategory,
}: Props) {
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { tags, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   tags: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };
 const queryClient = useQueryClient();

 const { mutate: mutateTag, isPending: isCreating } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'tags'],
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
  mutationFn(data: AddTagSchema) {
   const newTag = {
    locale,
    name: data.title,
    tagTypeID: Number(data.category.id),
   };
   return tag
    ? updateTag({
       ...newTag,
       id: tag.id,
      })
    : createTag(newTag);
  },
 });
 const {
  control,
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<AddTagSchema>({
  resolver: zodResolver(addTagSchema),
  defaultValues: {
   title: '',
  },
 });

 useEffect(() => {
  if (tag) {
   setValue('title', tag.name);
   setValue('category', {
    id: tag.tagTypeID.toString(),
    name: tag.tagTypeName,
   });
  } else {
   const activeCategory = defaultCategory || tagCategories[0];
   setValue('title', '');
   if (activeCategory) {
    setValue('category', {
     id: activeCategory.id.toString(),
     name: activeCategory.name,
    });
   }
  }
 }, [tag, tagCategories, setValue, open, defaultCategory]);

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
      {tag ? (tags.editTag as string) : (tags.addTag as string)}
     </span>
     <IconButton loading={isCreating} color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='mb-4'>
     <Controller
      control={control}
      name='category'
      render={({ field }) => (
       <Autocomplete
        disableClearable
        {...field}
        size='small'
        value={field.value || null}
        onChange={(_, value) => field.onChange(value)}
        options={tagCategories.map((item) => ({
         id: item.id.toString(),
         name: item.name,
        }))}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
         <TextField {...params} label={tags.category as string} required />
        )}
       />
      )}
     />
    </div>
    <TextField
     fullWidth
     multiline
     rows={8}
     size='small'
     {...register('title')}
     label={tags.title as string}
     error={!!errors.title}
     helperText={errors.title?.message}
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
     {tags.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating}
    >
     {tags.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
