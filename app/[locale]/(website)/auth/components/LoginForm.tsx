'use client';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { GradientButton } from '@/components/Button/GradientButton';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import IconButton from '@mui/material/IconButton';
import { type WithDictionary } from '@/localization/locales';
import { iranPhoneRegex } from '@/utils/validationRegex';
import { useSnackbar } from 'notistack';
import { registerUser } from '@/services/api-actions/authApiActionts';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
 InputOTP,
 InputOTPGroup,
 InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import Button from '@mui/material/Button';

type Props = WithDictionary;
const phoneNoDigitsCount = 11;

export default function LoginForm({ dic }: Props) {
 const [loginStep, setLoginStep] = useState(2);
 const [otp, setOtp] = useState('');
 const [phoneNo, setPhoneNo] = useState('');
 const [invalidPhoneNoMessage, setInvalidPhoneNoMessage] = useState('');
 const snackbar = useSnackbar();

 const { mutate: handleRegisterUser, isPending: isRegistering } = useMutation({
  mutationFn: () => {
   return registerUser({
    cellPhone: phoneNo,
   });
  },
  onSuccess: () => {
   snackbar.enqueueSnackbar({
    variant: 'success',
    message: dic.codeSentSuccessfully as string,
   });
   setLoginStep(2);
  },
  onError: (err: AxiosError) => {
   snackbar.enqueueSnackbar({
    variant: 'error',
    message:
     (err.response?.data as string) ||
     (dic.errorHappendTryAgainLater as string),
   });
  },
 });

 const register = (
  <>
   <div className='grid gap-6 mb-8'>
    <TextField
     inputMode='numeric'
     size='medium'
     label={dic.phone as string}
     fullWidth
     required
     value={phoneNo}
     onChange={(e) => {
      const value = e.target.value;
      if (value.length > phoneNoDigitsCount) {
       return;
      }
      setInvalidPhoneNoMessage('');
      const isValidNo =
       value === '' || value === '0' || Number(value) ? true : false;
      if (value.length === phoneNoDigitsCount && !iranPhoneRegex.test(value)) {
       setInvalidPhoneNoMessage(dic.invalidPhoneNoMessage as string);
      }
      if (isValidNo) {
       setPhoneNo(value);
      }
     }}
     error={!!invalidPhoneNoMessage}
     helperText={invalidPhoneNoMessage}
     slotProps={{
      input: {
       startAdornment: (
        <InputAdornment position='start' className='-me-2'>
         <IconButton disabled>
          <PhoneEnabledIcon />
         </IconButton>
        </InputAdornment>
       ),
      },
     }}
    />
   </div>
   <div className='mb-6'>
    <GradientButton
     loading={isRegistering}
     className='min-h-[3rem]'
     size='large'
     fullWidth
     onClick={() => {
      const isValidNo =
       phoneNo.length === phoneNoDigitsCount && iranPhoneRegex.test(phoneNo);
      if (!isValidNo) {
       snackbar.enqueueSnackbar({
        variant: 'error',
        message: dic.invalidPhoneNoMessage as string,
       });
       return;
      }
      handleRegisterUser();
     }}
    >
     {dic.sendCode as string}
    </GradientButton>
   </div>
  </>
 );

 const verify = (
  <>
   <div className='flex flex-col items-center justify-center mb-8'>
    <div>
     <label className='inline-block mb-2' htmlFor='login-code'>
      {dic.loginCode as string}:{' '}
     </label>
     <div style={{ direction: 'ltr' }}>
      <InputOTP
       pattern={REGEXP_ONLY_DIGITS}
       maxLength={6}
       autoFocus
       id='login-code'
       value={otp}
       onChange={(value) => {
        setOtp(value);
       }}
      >
       <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
       </InputOTPGroup>
      </InputOTP>
     </div>
    </div>
   </div>
   <div className='mb-6'>
    <GradientButton
     loading={isRegistering}
     className='min-h-[3rem]'
     size='large'
     fullWidth
    >
     {dic.confirm as string}
    </GradientButton>
    <div className='mt-4'>
     <Button
      color='warning'
      onClick={() => {
       setOtp('');
       setLoginStep(1);
      }}
     >
      <span>{dic.editPhoneNo as string}</span>
     </Button>
    </div>
   </div>
  </>
 );

 return (
  <form className='mt-4 p-4 w-[min(25rem,100%)] mx-auto'>
   <div className='w-[8rem] aspect-square mx-auto border border-primary-dark rounded-lg grid place-content-center mb-20'>
    LOGO
   </div>
   {loginStep === 1 ? register : verify}
  </form>
 );
}
