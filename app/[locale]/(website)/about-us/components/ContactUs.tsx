'use client';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SendIcon from '@mui/icons-material/Send';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TfiInstagram } from 'react-icons/tfi';
import { GradientButton } from '@/components/Button/GradientButton';
import TextField from '@mui/material/TextField';

export default function ContactUs() {
 return (
  <section className='container mb-6'>
   <article className='flex items-center gap-2 mb-6'>
    <div className='flex-grow h-[2px] bg-orange-500 dark:bg-orange-700'></div>
    <div className='flex gap-4 flex-wrap'>
     <IconButton color='warning'>
      <FaPhoneSquareAlt fontSize={'2rem'} />
     </IconButton>
     <IconButton color='secondary'>
      <IoLogoWhatsapp fontSize={'2rem'} />
     </IconButton>
     <IconButton color='error'>
      <TfiInstagram fontSize={'2rem'} />
     </IconButton>
     <IconButton color='info'>
      <FaTelegramPlane fontSize={'2rem'} />
     </IconButton>
    </div>
    <div className='flex-grow h-[2px] bg-orange-500 dark:bg-orange-700'></div>
   </article>
   <article className='grid lg:grid-cols-2 gap-4'>
    <div>
     <div>
      <h1 className='text-2xl font-bold mb-2'>
       <ApartmentIcon fontSize='large' className='me-4' color='primary' />
       <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
        شرکت
       </span>
       <span className='inline-block ms-4'> </span>
       <br className='hidden' />
       <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
        ----
       </span>
      </h1>
      <p className='w-[min(100%,32rem)] leading-7 mb-10'>
       لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
       از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
       سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
      </p>
      <div>
       <div className='flex gap-2 items-center mb-4'>
        <FmdGoodIcon fontSize='large' color='error' />
        <p className='font-medium'>ادرس شرکت ....</p>
       </div>
       <div className='flex gap-2 items-center'>
        <PhoneEnabledIcon fontSize='large' color='secondary' />
        <p className='font-medium'>شماره تماس شرکت ....</p>
       </div>
      </div>
     </div>
    </div>
    <form>
     <div className='grid gap-4 grid-cols-2 mb-4'>
      <TextField label='نام' />
      <TextField label='نام‌ خانوادگی' />
      <TextField label='شماره همراه' />
      <TextField label='موضوع' />
      <TextField
       minRows={3}
       multiline
       className='col-span-full'
       label='توضیحات'
      />
     </div>
     <GradientButton size='large' className='w-full h-[3rem]'>
      <div className='flex gap-2'>
       <span className='font-medium text-base'>ثبت و ارسال</span>
       <SendIcon className='rotate-180' />
      </div>
     </GradientButton>
    </form>
   </article>
  </section>
 );
}
