'use client';

import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import { GradientButton } from '@/components/Button/GradientButton';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
// import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 hour: '2-digit',
 minute: '2-digit',
});

export default function Articles() {
 return (
  <section id='articles' className='relative mb-14'>
   <div className='container'>
    <div className='text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[50%] after:bottom-0 after:w-[10rem] after:translate-x-[50%] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[50%] before:bottom-[1px] before:w-[15rem] before:translate-x-[50%] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>مقـــالات و اخبــار</h2>
     </div>
    </div>
    <ul className='grid lg:grid-cols-2 mb-4'>
     {[1, 2, 3, 4].map((item) => (
      <li key={item}>
       <Link
        href='#'
        className='group transition-colors flex flex-col lg:flex-row gap-4 lg:items-start p-4 rounded-lg hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
       >
        <div className='shrink-0 rounded-lg overflow-hidden h-[14rem] lg:w-[12rem] lg:h-[10rem]'>
         <img
          style={{
           transition: 'transform 0.3s ease',
          }}
          loading='lazy'
          className='h-full w-full object-cover object-center brightness-90 group-hover:scale-105'
          src='/services/security-camera-installation.jpg'
          alt='services imageg'
         />
        </div>
        <div>
         <h3 className='font-medium text-lg mb-2 text-primary-dark'>
          نصب دوربین
         </h3>
         <div className='text-[0.7rem] flex gap-2 flex-wrap'>
          <div className='flex gap-1 items-center text-secondary'>
           <CalendarMonthIcon fontSize='small' />
           <span>{dateFormatter.format(new Date())}</span>
          </div>
          <div></div>
          <div></div>
         </div>
         <p className='text-justify text-neutral-500 dark:text-neutral-200 mb-4'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با فیک
          است، چاپگرها و متون بلکه روزنامه و مجله در لورم ایپسوم متن ساختگی با
          تولید سادگی نامفهوم از صنعت چاپ، و با فیک است، چاپگرها و متون بلکه
          روزنامه و مجله در
         </p>
         <div className='flex justify-between'>
          <div className='flex gap-1'>
           <IconButton
            size='small'
            color='primary'
            className='!bg-sky-300/20 !dark:bg-sky-700/20'
           >
            <ShareOutlinedIcon />
           </IconButton>
           <IconButton
            size='small'
            color='error'
            className='!bg-red-300/20 !dark:bg-red-700/20'
           >
            <FavoriteBorderOutlinedIcon />
           </IconButton>
          </div>
          <Button size='small' variant='outlined'>
           <div>
            <span>ادامه مطالب</span>
           </div>
          </Button>
         </div>
        </div>
       </Link>
      </li>
     ))}
    </ul>
    <div className='flex justify-end'>
     <Button
      className='w-[10rem]'
      size='large'
      variant='outlined'
      color='secondary'
     >
      <div className='flex gap-4'>
       <span className='font-medium'>موارد بیشتر</span>
       <KeyboardBackspaceIcon />
      </div>
     </Button>
    </div>
   </div>
  </section>
 );
}
