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

type Props = WithDictionary;
const phoneNoDigitsCount = 11;

export default function LoginForm({ dic }: Props) {
 const [loginStep, setLoginStep] = useState(1);
 const [phoneNo, setPhoneNo] = useState('');
 const [invalidPhoneNoMessage, setInvalidPhoneNoMessage] = useState('');
 const snackbar = useSnackbar();

 function handleRegisterUser() {
  const isValidNo =
   phoneNo.length === phoneNoDigitsCount && iranPhoneRegex.test(phoneNo);
  if (!isValidNo) {
   snackbar.enqueueSnackbar({
    variant: 'error',
    message: dic.invalidPhoneNoMessage as string,
   });
   return;
  }
 }

 return (
  <form className='mt-4 p-4 w-[min(25rem,100%)] mx-auto'>
   <div className='w-[8rem] aspect-square mx-auto border border-primary-dark rounded-lg grid place-content-center mb-20'>
    LOGO
   </div>
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
     className='min-h-[3rem]'
     size='large'
     fullWidth
     onClick={handleRegisterUser}
    >
     {dic.sendCode as string}
    </GradientButton>
   </div>
  </form>
 );
}
