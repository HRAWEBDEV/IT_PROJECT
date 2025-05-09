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
 type BlogState,
 patchBlog,
} from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 changeStateSchema,
 type ChangeStateSchema,
} from '../schemas/changeState';
import TextField from '@mui/material/TextField';
import { AxiosError } from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

type Props = {
 open: boolean;
 article: Blog;
 blogStates: BlogState[];
 onClose: () => void;
};

export default function ChangeState({
 open,
 onClose,
 article,
 blogStates,
}: Props) {
 const { control, handleSubmit, setValue } = useForm<ChangeStateSchema>({
  resolver: zodResolver(changeStateSchema),
 });
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { articles, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   articles: Dic;
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
  };
 const queryClient = useQueryClient();

 const { mutate: changeState, isPending } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'articles'],
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
  mutationFn(data: ChangeStateSchema) {
   return patchBlog({
    blogID: article.id,
    blogState: Number(data.state.id),
    locale,
   });
  },
 });

 useEffect(() => {
  setValue('state', {
   id: article.blogStateID.toString(),
   name: article.blogStateName,
  });
 }, [open, article, setValue]);

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='xs'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
    handleSubmit((data) => changeState(data))();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>
      {articles.changeState as string}
     </span>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <Controller
     name='state'
     control={control}
     render={({ field }) => (
      <Autocomplete
       {...field}
       size='small'
       disableClearable={true}
       value={field.value || null}
       onChange={(_, value) => field.onChange(value)}
       options={blogStates.map((item) => ({
        id: item.id.toString(),
        name: item.name,
       }))}
       getOptionLabel={(option) => option.name}
       renderInput={(params) => (
        <TextField {...params} label={articles.state as string} />
       )}
      />
     )}
    />
   </DialogContent>
   <DialogActions>
    <Button
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
     disabled={isPending}
    >
     {articles.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
