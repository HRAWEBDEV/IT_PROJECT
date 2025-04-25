'use client';
import TextField from '@mui/material/TextField';
import { GradientButton } from '@/components/Button/GradientButton';

export default function CommentSection() {
 return (
  <section className='container mb-8'>
   <h3 className='text-2xl font-medium lg:text-3xl mb-4'>دیدگاه شما</h3>
   <form className=''>
    <div className='mb-4'>
     <TextField
      fullWidth
      multiline
      placeholder='دیدگاه خود را بنویسید'
      rows={5}
     />
    </div>
    <div className='flex justify-end'>
     <GradientButton size='large' className='mt-4 w-[10rem]'>
      ارسال
     </GradientButton>
    </div>
   </form>
  </section>
 );
}
