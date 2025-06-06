'use client';
import { useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { GradientButton } from '@/components/Button/GradientButton';
import TextField from '@mui/material/TextField';
import { type WithDictionary } from '@/localization/locales';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ContactUsSchema, contactUsSchema } from '../schemas/contactUs';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import { useMutation } from '@tanstack/react-query';
import { addContactUs } from '@/services/api-actions/globalApiActions';
import { useSnackbar } from 'notistack';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { AxiosError } from 'axios';
import { type Owner } from '@/services/api-actions/authApiActionts';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SocialMedias from '../../components/social-medias/SocialMedias';

type Props = WithDictionary & {
 owner: Owner | null;
};

export default function ContactUs({ dic, owner }: Props) {
 const { enqueueSnackbar } = useSnackbar();
 const { changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
  };
 const { userInfo } = useAuthCheck();
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
  watch,
 } = useForm<ContactUsSchema>({
  resolver: zodResolver(contactUsSchema),
  defaultValues:
   userInfo && userInfo.User
    ? {
       firstName: userInfo.User.firstName,
       lastName: userInfo.User.lastName,
       email: userInfo.User.email || '',
       phone: userInfo.User.cellPhone || '',
       description: '',
      }
    : {
       firstName: '',
       lastName: '',
       email: '',
       phone: '',
       description: '',
      },
 });
 const [firstName, lastName, phone, email] = watch([
  'firstName',
  'lastName',
  'phone',
  'email',
 ]);

 const { mutate: addContactUsMutation, isPending } = useMutation({
  mutationFn: (data: ContactUsSchema) =>
   addContactUs({
    id: 0,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email || null,
    cellPhone: data.phone,
    personID: userInfo?.User.personID || 0,
    description: data.description,
    isRead: false,
    deleted: false,
   }),
  onSuccess: () => {
   enqueueSnackbar({
    message: changesSavedSuccessfully,
    variant: 'success',
   });
   setValue('description', '');
  },
  onError: (err: AxiosError) => {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
 });

 useEffect(() => {
  if (userInfo?.User) {
   setValue('firstName', userInfo.User.firstName);
   setValue('lastName', userInfo.User.lastName);
   setValue('phone', userInfo.User.cellPhone || '');
   setValue('email', userInfo.User.email || '');
  }
 }, [userInfo?.User, setValue]);

 return (
  <section className='container mb-6'>
   <article className='flex items-center gap-2 mb-6'>
    <div className='flex-grow h-[2px] bg-orange-500 dark:bg-orange-700'></div>
    <SocialMedias />
    <div className='flex-grow h-[2px] bg-orange-500 dark:bg-orange-700'></div>
   </article>
   <article className='grid lg:grid-cols-2 gap-8'>
    <div>
     <div>
      <h1 className='text-2xl font-bold mb-2'>
       <ApartmentIcon fontSize='large' className='me-4' color='primary' />
       <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
        {dic.company as string}
       </span>
       <span className='inline-block ms-4'> </span>
       <br className='hidden' />
       <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
        {owner?.ownerName}
       </span>
      </h1>
      <p className='w-[min(100%,32rem)] leading-7 mb-10'>
       {owner?.descriptionName}
      </p>
      <div>
       <div className='flex gap-2 items-center mb-4'>
        <FmdGoodIcon fontSize='large' color='error' />
        <p className='font-medium'>{owner?.address}</p>
       </div>
       {owner?.email && (
        <div className='flex gap-2 items-center mb-4'>
         <AlternateEmailIcon fontSize='large' color='error' />
         <p className='font-medium'>{owner?.email}</p>
        </div>
       )}
       <div className='grid grid-cols-2 gap-2'>
        {owner?.telephone1 && (
         <div className='flex gap-2 items-center'>
          <PhoneAndroidIcon fontSize='large' color='secondary' />
          <p className='font-medium'>{owner?.telephone1}</p>
         </div>
        )}
        {owner?.telephone2 && (
         <div className='flex gap-2 items-center'>
          <PhoneAndroidIcon fontSize='large' color='secondary' />
          <p className='font-medium'>{owner?.telephone2}</p>
         </div>
        )}
        {owner?.telephone3 && (
         <div className='flex gap-2 items-center'>
          <PhoneAndroidIcon fontSize='large' color='secondary' />
          <p className='font-medium'>{owner?.telephone3}</p>
         </div>
        )}
        {owner?.cellphone1 && (
         <div className='flex gap-2 items-center'>
          <PhoneEnabledIcon fontSize='large' color='secondary' />
          <p className='font-medium'>{owner?.cellphone1}</p>
         </div>
        )}
        {owner?.cellphone2 && (
         <div className='flex gap-2 items-center'>
          <PhoneEnabledIcon fontSize='large' color='secondary' />
          <p className='font-medium'>{owner?.cellphone2}</p>
         </div>
        )}
        {owner?.cellphone3 && (
         <div className='flex gap-2 items-center'>
          <PhoneEnabledIcon fontSize='large' color='secondary' />
          <p className='font-medium'>{owner?.cellphone3}</p>
         </div>
        )}
       </div>
      </div>
     </div>
    </div>
    <form className='border-t border-orange-500 dark:border-orange-700 pt-8 lg:border-t-0'>
     <div className='grid gap-4 grid-cols-2 mb-4'>
      <TextField
       {...register('firstName')}
       error={!!errors.firstName}
       label={dic.firstName as string}
       slotProps={{
        input: {
         readOnly: !!userInfo?.User,
        },
        inputLabel: {
         shrink: !!firstName || undefined,
        },
       }}
      />
      <TextField
       {...register('lastName')}
       error={!!errors.lastName}
       label={dic.lastName as string}
       slotProps={{
        input: {
         readOnly: !!userInfo?.User,
        },
        inputLabel: {
         shrink: !!lastName || undefined,
        },
       }}
      />
      <TextField
       {...register('phone')}
       error={!!errors.phone}
       label={dic.phone as string}
       slotProps={{
        input: {
         readOnly: !!userInfo?.User,
        },
        inputLabel: {
         shrink: !!phone || undefined,
        },
       }}
      />
      <TextField
       {...register('email')}
       error={!!errors.email}
       label={dic.email as string}
       slotProps={{
        inputLabel: {
         shrink: !!email || undefined,
        },
       }}
      />
      <TextField
       minRows={3}
       multiline
       className='col-span-full'
       error={!!errors.description}
       label={dic.discription as string}
       {...register('description')}
      />
     </div>
     <GradientButton
      type='submit'
      loading={isPending}
      size='large'
      className='w-full h-[3rem]'
      onClick={(e) => {
       e.preventDefault();
       handleSubmit((data) => {
        addContactUsMutation(data);
       })();
      }}
     >
      <div className='flex gap-2'>
       <span className='font-medium text-base'>
        {dic.confirmAndSend as string}
       </span>
       <div className='ltr:rotate-180'>
        <SendIcon className='rotate-180' />
       </div>
      </div>
     </GradientButton>
    </form>
   </article>
  </section>
 );
}
