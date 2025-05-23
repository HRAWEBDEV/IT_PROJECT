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
 type Service,
 type ServiceState,
 patchService,
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
 service: Service;
 serviceStates: ServiceState[];
 onClose: () => void;
};

export default function ChangeState({
 open,
 onClose,
 service,
 serviceStates,
}: Props) {
 const { control, handleSubmit, setValue } = useForm<ChangeStateSchema>({
  resolver: zodResolver(changeStateSchema),
 });
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { services, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   services: Dic;
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
  };
 const queryClient = useQueryClient();

 const { mutate: changeState, isPending } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'services'],
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
   return patchService({
    serviceID: service.id,
    serviceStateID: Number(data.state.id),
    locale,
   });
  },
 });

 useEffect(() => {
  setValue('state', {
   id: service.serviceStateID.toString(),
   name: service.serviceStateName,
  });
 }, [open, service, setValue]);

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
      {services.changeState as string}
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
       options={serviceStates.map((item) => ({
        id: item.id.toString(),
        name: item.name,
       }))}
       getOptionLabel={(option) => option.name}
       renderInput={(params) => (
        <TextField {...params} label={services.state as string} />
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
     {services.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     disabled={isPending}
    >
     {services.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
