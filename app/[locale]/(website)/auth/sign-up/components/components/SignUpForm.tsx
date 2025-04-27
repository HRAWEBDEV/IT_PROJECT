'use client';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { GradientButton } from '@/components/Button/GradientButton';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function SignUpForm({ dic }: Props) {
 return (
  <form className='mt-4 p-4 w-[min(30rem,100%)] mx-auto'>
   <div className='w-[8rem] aspect-square mx-auto border border-primary-dark rounded-lg grid place-content-center mb-10'>
    LOGO
   </div>
   <div className='grid gap-6 mb-10'>
    <div className='grid grid-cols-2 gap-4'>
     <TextField
      size='medium'
      label={dic.firstName as string}
      fullWidth
      required
     />
     <TextField
      size='medium'
      label={dic.lastName as string}
      fullWidth
      required
     />
    </div>
    <div className='grid grid-cols-2 gap-4'>
     <TextField size='medium' label={dic.email as string} fullWidth required />
     <TextField size='medium' label={dic.phone as string} fullWidth required />
    </div>
    <TextField
     size='medium'
     label={dic.password as string}
     required
     fullWidth
     slotProps={{
      input: {
       endAdornment: (
        <InputAdornment position='end' className='-me-2'>
         <IconButton>
          <VisibilityIcon />
         </IconButton>
         <IconButton disabled>
          <LockIcon />
         </IconButton>
        </InputAdornment>
       ),
      },
     }}
    />
    <TextField
     size='medium'
     label={dic.confirmPassword as string}
     required
     fullWidth
     slotProps={{
      input: {
       endAdornment: (
        <InputAdornment position='end' className='-me-2'>
         <IconButton>
          <VisibilityIcon />
         </IconButton>
        </InputAdornment>
       ),
      },
     }}
    />
   </div>
   <div className='mb-6'>
    <GradientButton className='min-h-[3rem]' size='large' fullWidth>
     {dic.confirm as string}
    </GradientButton>
   </div>
   <div>
    <Button LinkComponent={Link} href='#'>
     {dic.forgotPassword as string}
    </Button>
   </div>
  </form>
 );
}
