'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { GradientButton } from '@/components/Button/GradientButton';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
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
  <section
   id='articles'
   className='bg-secondary-dark text-secondary-foreground py-8'
  >
   <div className='container'>
    <div className='text-center mb-6'>
     <h2 className='text-2xl font-bold'>مقـــالات و اخبــار</h2>
    </div>
    <div className='flex justify-end mb-2'>
     <div className='flex gap-4'>
      <IconButton className='!text-secondary-foreground !border !border-solid !border-secondary-foreground'>
       <ArrowForwardIosOutlinedIcon />
      </IconButton>
      <IconButton className='!text-secondary-foreground !border !border-solid !border-secondary-foreground'>
       <ArrowBackIosNewOutlinedIcon />
      </IconButton>
     </div>
    </div>
    <div className='mb-2'>
     <Swiper
      spaceBetween={20}
      pagination
      modules={[Pagination]}
      className='!pb-10 [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--secondary-foreground))] [&]:[--swiper-pagination-color:hsl(var(--secondary-foreground))]'
     >
      {[1, 2, 3].map((item) => (
       <SwiperSlide key={item}>
        <Link
         href='#'
         className='block bg-background rounded-lg text-foreground'
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
           <div>
            <IconButton color='primary'>
             <ShareOutlinedIcon />
            </IconButton>
            <IconButton color='error'>
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
    </div>
    <div>
     <Button
      size='large'
      variant='outlined'
      color='secondary'
      className='w-full !text-secondary-foreground'
     >
      <div className='flex gap-4'>
       <span className='font-medium'>مشاهده همه</span>
       <KeyboardBackspaceIcon />
      </div>
     </Button>
    </div>
   </div>
  </section>
 );
}
