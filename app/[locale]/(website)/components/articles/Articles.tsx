'use client';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import Link from 'next/link';
// import { GradientButton } from '@/components/Button/GradientButton';
// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import Button from '@mui/material/Button';
// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
// import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// const dateFormatter = new Intl.DateTimeFormat('fa', {
//  year: 'numeric',
//  month: 'long',
//  day: 'numeric',
//  hour: '2-digit',
//  minute: '2-digit',
// });

export default function Articles() {
 return (
  <section id='articles' className='relative'>
   <div className='container'>
    <div className='text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[50%] after:bottom-0 after:w-[10rem] after:translate-x-[50%] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[50%] before:bottom-[1px] before:w-[15rem] before:translate-x-[50%] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>مقـــالات و اخبــار</h2>
     </div>
     {/* <p className='text-neutral-500 dark:text-neutral-200 w-[min(100%,40rem)] text-center leading-7 mb-10 container lg:text-base lg:leading-7'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p> */}
    </div>
   </div>
  </section>
 );
}
