'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { GradientButton } from '@/components/Button/GradientButton';

export default function LoginForm() {
 return (
  <div className='container'>
   <form className='my-5 lg:my-20 rounded-lg border border-neutral-300 dark:border-neutral-700 p-4'>
    <div className='flex items-center justify-center text-2xl text-primary h-[8rem] bg-teal-50 dark:bg-teal-950'>
     LOGO
    </div>
    <div className='flex items-center gap-2 mb-14'>
     <span className='flex-grow h-[1px] bg-foreground'></span>
     <span className='text-base font-medium'>ورود</span>
     <span className='flex-grow h-[1px] bg-foreground'></span>
    </div>
    <div className='mb-12'>
     <div className='grid gap-6'>
      <TextField fullWidth label='نام کاربری' required />
      <TextField fullWidth label='رمز عبور' required />
     </div>
    </div>
    <div className='flex justify-between'>
     <div className='flex flex-col gap-4'>
      <Button
       variant='outlined'
       LinkComponent={Link}
       href='#'
       color='secondary'
       className='w-[7rem]'
      >
       ثبت نام
      </Button>
      <Button
       LinkComponent={Link}
       href='#'
       color='error'
       className='!text-[0.75rem]'
      >
       فراموشی رمز؟
      </Button>
     </div>
     <div>
      <GradientButton className='w-[8rem]'>تایید</GradientButton>
     </div>
    </div>
   </form>
  </div>
 );
}
