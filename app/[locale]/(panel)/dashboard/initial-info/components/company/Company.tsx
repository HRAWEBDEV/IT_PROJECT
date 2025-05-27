'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOwner, updateOwner } from '@/services/api-actions/authApiActionts';
import CircularProgress from '@mui/material/CircularProgress';
import { useAccessContext } from '../../../services/access/accessContext';
import NoAccessGranted from '../../../components/NoAccessGranted';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import {
 type TCompanySchema,
 companySchema,
} from '../../schemas/companySchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const phoneNumberLimit = 3;
const mobileNumberLimit = 3;

export default function Company() {
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<TCompanySchema>({
  resolver: zodResolver(companySchema),
  defaultValues: {
   ownerName: '',
   nationalCode: '',
   email: '',
   fax: '',
   addressName: '',
   descriptionName: '',
   registerNo: '',
   postalCode: '',
   telephone1: '',
   telephone2: '',
   telephone3: '',
   cellPhone1: '',
   cellPhone2: '',
   cellPhone3: '',
  },
 });
 const { enqueueSnackbar } = useSnackbar();
 const queryClient = useQueryClient();
 const { roleAccess } = useAccessContext();
 const {
  initialInfo,
  noItemsFound,
  errorTryAgainLater,
  changesSavedSuccessfully,
 } = useWebsiteDictionary() as {
  initialInfo: Dic;
  noItemsFound: string;
  errorTryAgainLater: string;
  changesSavedSuccessfully: string;
 };

 const {
  data: owner,
  isLoading,
  isError,
 } = useQuery({
  queryKey: ['owner'],
  async queryFn({ signal }) {
   const owner = await getOwner({ signal }).then((res) => res.data);
   setValue('ownerName', owner.ownerName || '');
   setValue('nationalCode', owner.nationalCode || '');
   setValue('email', owner.email || '');
   setValue('fax', owner.fax || '');
   setValue('addressName', owner.addressName || '');
   setValue('descriptionName', owner.descriptionName || '');
   setValue('registerNo', owner.registerNo || '');
   setValue('postalCode', owner.postalCode || '');
   setValue('telephone1', owner.telephone1 || '');
   setValue('telephone2', owner.telephone2 || '');
   setValue('telephone3', owner.telephone3 || '');
   setValue('cellPhone1', owner.cellphone1 || '');
   setValue('cellPhone2', owner.cellphone2 || '');
   setValue('cellPhone3', owner.cellphone3 || '');
   return owner;
  },
 });

 const { mutate: updateOwnerMutate, isPending: isUpdating } = useMutation({
  mutationFn(data: TCompanySchema) {
   return updateOwner({
    ...owner!,
    ownerName: data.ownerName,
    nationalCode: data.nationalCode || null,
    email: data.email || null,
    fax: data.fax || null,
    addressName: data.addressName || null,
    descriptionName: data.descriptionName || null,
    registerNo: data.registerNo || null,
    postalCode: data.postalCode || null,
    telephone1: data.telephone1 || null,
    telephone2: data.telephone2 || null,
    telephone3: data.telephone3 || null,
    cellphone1: data.cellPhone1 || null,
    cellphone2: data.cellPhone2 || null,
    cellphone3: data.cellPhone3 || null,
   });
  },
  onSuccess() {
   enqueueSnackbar({
    message: changesSavedSuccessfully,
    variant: 'success',
   });
   queryClient.invalidateQueries({ queryKey: ['owner'] });
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
 });

 if (!roleAccess.read) {
  return <NoAccessGranted />;
 }

 if (isLoading) {
  return (
   <div className='flex justify-center items-center min-h-[20rem]'>
    <CircularProgress />
   </div>
  );
 }

 if (isError || !owner) {
  return (
   <div className='flex justify-center items-center min-h-[20rem]'>
    <p className='text-lg font-medium text-red-600 dark:text-red-400'>
     {noItemsFound}
    </p>
   </div>
  );
 }

 return (
  <section>
   <h1 className='font-bold text-2xl mb-4'>{initialInfo.title as string}</h1>
   <form className='bg-background border border-neutral-300 dark:border-neutral-700 rounded-lg p-4'>
    <div className='grid gap-4'>
     <div className='grid grid-cols-2 gap-4'>
      <TextField
       {...register('ownerName')}
       size='small'
       label={initialInfo.name as string}
       error={!!errors.ownerName}
       required
       slotProps={{
        inputLabel: {
         shrink: true,
        },
       }}
      />
      <TextField
       {...register('nationalCode')}
       size='small'
       label={initialInfo.nationalCode as string}
       error={!!errors.nationalCode}
       helperText={errors.nationalCode?.message}
       slotProps={{
        inputLabel: {
         shrink: true,
        },
       }}
      />
      <TextField
       {...register('email')}
       size='small'
       label={initialInfo.email as string}
       error={!!errors.email}
       slotProps={{
        inputLabel: {
         shrink: true,
        },
       }}
      />
      <TextField
       {...register('fax')}
       size='small'
       label={initialInfo.faxNumber as string}
       error={!!errors.fax}
       helperText={errors.fax?.message}
       slotProps={{
        inputLabel: {
         shrink: true,
        },
       }}
      />
      <TextField
       {...register('postalCode')}
       size='small'
       label={initialInfo.postalCode as string}
       error={!!errors.postalCode}
       helperText={errors.postalCode?.message}
       slotProps={{
        inputLabel: {
         shrink: true,
        },
       }}
      />
      <TextField
       {...register('registerNo')}
       size='small'
       label={initialInfo.registerNo as string}
       error={!!errors.registerNo}
       helperText={errors.registerNo?.message}
       slotProps={{
        inputLabel: {
         shrink: true,
        },
       }}
      />
     </div>
     <div className='grid grid-cols-3 gap-4'>
      {Array.from({ length: phoneNumberLimit }).map((_, index) => (
       <TextField
        key={index}
        {...register(
         `telephone${(index + 1).toString()}` as keyof TCompanySchema
        )}
        size='small'
        label={initialInfo.telePhoneNumber as string}
        error={
         !!errors[`telephone${(index + 1).toString()}` as keyof TCompanySchema]
        }
        slotProps={{
         inputLabel: {
          shrink: true,
         },
        }}
       />
      ))}
     </div>
     <div className='grid grid-cols-3 gap-4'>
      {Array.from({ length: mobileNumberLimit }).map((_, index) => (
       <TextField
        key={index}
        {...register(
         `cellPhone${(index + 1).toString()}` as keyof TCompanySchema
        )}
        size='small'
        label={initialInfo.mobileNumber as string}
        error={
         !!errors[`cellPhone${(index + 1).toString()}` as keyof TCompanySchema]
        }
        slotProps={{
         inputLabel: {
          shrink: true,
         },
        }}
       />
      ))}
     </div>
     <TextField
      {...register('addressName')}
      multiline
      rows={2}
      fullWidth
      size='small'
      label={initialInfo.address as string}
      error={!!errors.addressName}
      required
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
     />
     <TextField
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
      {...register('descriptionName')}
      multiline
      rows={4}
      fullWidth
      size='small'
      label={initialInfo.description as string}
      error={!!errors.descriptionName}
      required
     />
    </div>
    {roleAccess.update && (
     <div className='flex justify-end gap-4 mt-6'>
      <Button
       className='w-[8rem]'
       variant='contained'
       color='primary'
       loading={isUpdating}
       onClick={() => {
        handleSubmit((data) => {
         updateOwnerMutate(data);
        })();
       }}
      >
       {initialInfo.save as string}
      </Button>
     </div>
    )}
   </form>
  </section>
 );
}
