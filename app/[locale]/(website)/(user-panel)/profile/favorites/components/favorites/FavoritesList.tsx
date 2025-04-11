'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { GradientButton } from '@/components/Button/GradientButton';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 hour: '2-digit',
 minute: '2-digit',
});

export default function FavoritesList() {
 return (
  <div className='container'>
   {['پروژه‌هـــا', 'اخبار و مقـــالات'].map((item) => (
    <article key={item} className='mb-4'>
     <div className='mb-4 flex gap-4 items-center'>
      <span className='font-medium text-primary text-lg'>{item}</span>
      <div className='flex-grow bg-primary h-[1px]'></div>
     </div>
     <Swiper
      spaceBetween={20}
      pagination
      modules={[Pagination]}
      breakpoints={{
       768: {
        slidesPerView: 2,
       },
       1258: {
        slidesPerView: 3,
       },
      }}
      className='!pb-10 [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--foreground))] [&]:[--swiper-pagination-color:hsl(var(--foreground))]'
     >
      {[1, 2, 3, 4, 5].map((item) => (
       <SwiperSlide key={item}>
        <Link
         href='#'
         className='border border-neutral-300 dark:border-neutral-700 block bg-background rounded-lg text-foreground'
        >
         <div className='p-2'>
          <div className='relative after:content-* after:absolute after:inset-0 after:bg-black/10 dark:after:bg-black/20 h-[16rem]'>
           <img
            src='/services/security-camera-installation.jpg'
            alt='aritcle-imgage'
            className='w-full h-full object-cover object-center rounded-lg'
           />
          </div>
         </div>
         <div className='px-4 py-2 pb-4'>
          <div className='mb-1 flex'>
           <div className='text-primary-dark font-medium'>
            <span className='text-[0.7rem]'>
             {dateFormatter.format(new Date())}
            </span>
           </div>
          </div>
          <h3 className='text-lg font-medium text-secondary mb-3'>
           تفاوت پشتیبانی شبکه فیزیکی و نرم افزاری
          </h3>
          <p className='mb-6 leading-6'>
           در دنیای پرشتاب فناوری اطلاعات، پشتیبانی سیستم‌ها یکی از عوامل کلیدی
           در دنیای پرشتاب فناوری اطلاعات، پشتیبانی سیستم‌ها یکی از عوامل کلیدی
           برای حفظ ....
          </p>
          <div className='flex justify-between items-center'>
           <div className='flex gap-1'>
            <IconButton
             color='primary'
             className='!bg-sky-300/20 !dark:bg-sky-700/20'
            >
             <ShareOutlinedIcon />
            </IconButton>
            <IconButton
             color='error'
             className='!bg-red-300/20 !dark:bg-red-700/20'
            >
             <FavoriteBorderOutlinedIcon />
            </IconButton>
           </div>
           <GradientButton>
            <div className='flex gap-3 items-center'>
             <span>ادامه مطالب</span>
             <VisibilityIcon />
            </div>
           </GradientButton>
          </div>
         </div>
         <div></div>
        </Link>
       </SwiperSlide>
      ))}
     </Swiper>
    </article>
   ))}
  </div>
 );
}
