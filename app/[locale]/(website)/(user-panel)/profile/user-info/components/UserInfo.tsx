'use client';
import { useEffect } from 'react';
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
import { UpdateUser } from '@/services/api-actions/globalApiActions';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
export default function UserInfo() {
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

 const { mutate: updateUser, isPending: isUpdating } = useMutation({
  async mutationFn(data: UserInfoSchema) {
   if (!userInfo?.User) return;
   const newUser = {
    ...userInfo.User,
    firstName: data.firstName,
    lastName: data.lastName,
    cellPhone: data.cellPhone,
    email: data.email,
   };
   return UpdateUser(newUser);
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
  <div>
   <h2 className='font-bold text-2xl mb-8'>{userPanel.userInfo as string}</h2>
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
        updateUser(data);
       })();
      }}
     >
      {userPanel.updateUserInfo as string}
     </GradientButton>
    </div>
   </form>
  </div>
 );
}
