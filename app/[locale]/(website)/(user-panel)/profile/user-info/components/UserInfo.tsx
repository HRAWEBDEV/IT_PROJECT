'use client';
import { useEffect, useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { GradientButton } from '@/components/Button/GradientButton';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoSchema, type UserInfoSchema } from '../schemas/userInfo';
import { iranPhoneRegex, phoneNoDigitsCount } from '@/utils/validationRegex';
import { useMutation } from '@tanstack/react-query';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import { updateUser } from '@/services/api-actions/globalApiActions';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddImage from './AddImage';

export default function UserInfo() {
 const [showUpdateImage, setShowUpdateImage] = useState(false);
 const { enqueueSnackbar } = useSnackbar();
 const { userInfo, refreshUserInfo } = useAuthCheck();
 const { userPanel, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   userPanel: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };

 const {
  register,
  handleSubmit,
  watch,
  setValue,
  setError,
  clearErrors,
  formState: { errors },
 } = useForm<UserInfoSchema>({
  resolver: zodResolver(userInfoSchema),
  defaultValues: {
   firstName: '',
   lastName: '',
   cellPhone: '',
   email: '',
  },
 });
 const cellPhone = watch('cellPhone');

 const { mutate: handleUpdateUser, isPending: isUpdating } = useMutation({
  async mutationFn(data: UserInfoSchema) {
   if (!userInfo?.User) return;
   const newUser = {
    ...userInfo.User,
    firstName: data.firstName,
    lastName: data.lastName,
    cellPhone: data.cellPhone,
    email: data.email,
   };
   return updateUser(newUser);
  },
  onSuccess: () => {
   enqueueSnackbar(changesSavedSuccessfully, {
    variant: 'success',
   });
   refreshUserInfo();
  },
  onError: (err: AxiosError) => {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
 });

 useEffect(() => {
  if (!userInfo?.User) return;
  setValue('firstName', userInfo.User.firstName);
  setValue('lastName', userInfo.User.lastName);
  setValue('cellPhone', userInfo.User.cellPhone || '');
  setValue('email', userInfo.User.email || '');
 }, [userInfo?.User, setValue]);

 return (
  <div className='mb-8'>
   <div className='flex flex-col gap-4 justify-center items-center mb-8'>
    <Avatar
     alt='user profile image'
     src={`${process.env.NEXT_PUBLIC_BASE_URL}${
      userInfo?.User.profileImage || ''
     }`}
     sx={{ height: '14rem', width: '14rem' }}
    />
    <Button
     variant='contained'
     color='primary'
     onClick={() => setShowUpdateImage(true)}
    >
     {userPanel.changeProfilePicture as string}
    </Button>
   </div>
   <form className=''>
    <div className='grid gap-4 grid-cols-2 mb-6'>
     <TextField
      {...register('firstName')}
      size='small'
      label={userPanel.firstName as string}
      error={!!errors.firstName}
      helperText={errors.firstName?.message}
     />
     <TextField
      {...register('lastName')}
      size='small'
      label={userPanel.lastName as string}
      error={!!errors.lastName}
      helperText={errors.lastName?.message}
     />
     <TextField
      value={cellPhone}
      onChange={(e) => {
       const value = e.target.value;
       if (value.length > phoneNoDigitsCount) {
        return;
       }
       clearErrors('cellPhone');
       const isValidNo =
        value === '' || value === '0' || Number(value) ? true : false;
       if (value.length === phoneNoDigitsCount && !iranPhoneRegex.test(value)) {
        setError('cellPhone', { message: '' });
        return;
       }
       if (isValidNo) {
        setValue('cellPhone', value);
       }
      }}
      slotProps={{
       input: {
        readOnly: true,
       },
      }}
      inputMode='numeric'
      size='small'
      label={userPanel.cellPhone as string}
      error={!!errors.cellPhone}
      helperText={errors.cellPhone?.message}
     />
     <TextField
      {...register('email')}
      size='small'
      label={userPanel.email as string}
      error={!!errors.email}
      helperText={errors.email?.message}
     />
    </div>
    <div className='flex justify-end'>
     <GradientButton
      loading={isUpdating}
      onClick={(e) => {
       e.preventDefault();
       handleSubmit((data) => {
        handleUpdateUser(data);
       })();
      }}
     >
      {userPanel.updateUserInfo as string}
     </GradientButton>
    </div>
   </form>
   <AddImage open={showUpdateImage} onClose={() => setShowUpdateImage(false)} />
  </div>
 );
}
