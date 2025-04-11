'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { GradientButton } from '@/components/Button/GradientButton';

export default function RegisterForm() {
 return (
  <div className='container'>
   <form className='my-5 lg:my-12 rounded-xl bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300'>
    <div className='text-primary-foreground flex justify-between items-center mb-4 p-4'>
     <div>
      <p className='font-medium text-2xl'>ثبت نام</p>
     </div>
     <div className='bg-primary-foreground aspect-square w-[6rem] rounded-lg text-foreground grid place-content-center font-medium'>
      LOGO
     </div>
    </div>
    <div className='bg-primary-foreground rounded-xl border-[1px] border-neutral-300 shadow-md p-6 pt-10'>
     <div className='grid gap-8 mb-10'>
      <TextField fullWidth size='small' label='نام' required />
      <TextField fullWidth size='small' label='نام ‌خانوادگی' required />
      <TextField fullWidth size='small' label='رمز عبور' required />
      <TextField fullWidth size='small' label='تکرار رمز عبور' required />
     </div>
     <div className='mb-8'>
      <GradientButton fullWidth size='large'>
       تایید
      </GradientButton>
     </div>
     <div>
      <div className='grid gap-2'>
       <Button LinkComponent={Link} href='#'>
        ورود
       </Button>
       <Button
        color='error'
        LinkComponent={Link}
        className='!text-[0.7rem]'
        href='#'
       >
        فراموشی رمز؟
       </Button>
      </div>
     </div>
    </div>
   </form>
  </div>
 );
}
