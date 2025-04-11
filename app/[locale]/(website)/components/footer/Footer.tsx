'use client';
import Button from '@mui/material/Button';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TfiInstagram } from 'react-icons/tfi';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Link from 'next/link';

export default function Footer() {
 return (
  <footer className='pt-8 bg-neutral-300 dark:bg-neutral-700'>
   <div className='container'>
    <div className='flex justify-end'>
     <Button
      variant='outlined'
      className='w-[10rem] !border-neutral-600 !text-neutral-600 dark:!border-neutral-400 dark:!text-neutral-400'
      onClick={() => {
       document.documentElement.scrollTop = 0;
      }}
     >
      <div className='flex gap-2 items-center'>
       <span>برو بالا</span>
       <ArrowUpwardIcon fontSize='small' />
      </div>
     </Button>
    </div>
    <section className='grid gap-10 lg:grid-cols-3'>
     <div>
      <div>
       <h4 className='text-2xl font-bold mb-2'>
        <ApartmentIcon fontSize='large' className='me-4' color='primary' />
        <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
         شرکت
        </span>
        <span className='inline-block ms-4'> </span>
        <br className='hidden' />
        <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
         ----
        </span>
       </h4>
       <p className='w-[min(100%,32rem)] leading-7 mb-6'>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
       </p>
       <div className='mb-4'>
        <div className='flex gap-2 items-center mb-4'>
         <FmdGoodIcon fontSize='large' color='error' />
         <p className='font-medium'>ادرس شرکت ....</p>
        </div>
        <div className='flex gap-2 items-center'>
         <PhoneEnabledIcon fontSize='large' color='secondary' />
         <p className='font-medium'>شماره تماس شرکت ....</p>
        </div>
       </div>
       <article className='flex items-center gap-2'>
        <div className='flex gap-2 flex-wrap'>
         <IconButton color='warning'>
          <FaPhoneSquareAlt fontSize={'1.5rem'} />
         </IconButton>
         <IconButton color='secondary'>
          <IoLogoWhatsapp fontSize={'1.5rem'} />
         </IconButton>
         <IconButton color='error'>
          <TfiInstagram fontSize={'1.5rem'} />
         </IconButton>
         <IconButton color='info'>
          <FaTelegramPlane fontSize={'1.5rem'} />
         </IconButton>
        </div>
       </article>
      </div>
     </div>
     <div>
      <h4 className='font-medium text-lg mb-4'>خدمـــات</h4>
      <ul className='grid gap-4'>
       {[1, 2, 3, 4, 5].map((item) => (
        <li key={item}>
         <Link href='#'>
          <KeyboardDoubleArrowLeftIcon color='error' />
          <span>خدمات تست ....</span>
         </Link>
        </li>
       ))}
      </ul>
     </div>
     <div>
      <h4 className='font-medium text-lg mb-4'>پروژه‌هـــا</h4>
      <ul className='grid gap-4'>
       {[1, 2, 3, 4, 5].map((item) => (
        <li key={item}>
         <Link href='#'>
          <KeyboardDoubleArrowLeftIcon color='error' />
          <span>پروژه تست ....</span>
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </section>
   </div>
   <div className='py-2 mt-2 border-t border-neutral-400 dark:border-neutral-600'>
    <div className='text-center'>
     <CopyrightIcon />
     <span>تمامی حقوق این سایت محفوظ است.</span>
     {new Date().getFullYear()}
    </div>
   </div>
  </footer>
 );
}
