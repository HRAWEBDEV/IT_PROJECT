'use client';
import ScrollDownIcon from '@/components/icons/ScrollDownIcon';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { TfiInstagram } from 'react-icons/tfi';
import Link from 'next/link';

export default function Hero() {
 return (
  <section
   id='hero'
   className='relative min-h-[30rem] h-[calc(100vh_-_(var(--header-height)_+_var(--mobile-bottom-nav-height)))] mb-12'
  >
   <div className='h-full bg-gradient-to-b from-white to-purple-100 dark:from-transparent dark:to-purple-950/30 dark:shadow-purple-700/5 blur-3xl'></div>
   <article className='absolute inset-0 container flex flex-col items-center justify-center h-full'>
    <h1 className='text-3xl text-center leading-[1.7] font-bold mb-2'>
     <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
      متخصص در حوزه فناوری
     </span>
     <br />
     <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
      اطلاعات و ارتباطات
     </span>
    </h1>
    <p className='w-[min(100%,32rem)] text-center leading-7 mb-10'>
     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
     طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
     که لازم است، و برای شرایط فعلی تکنولوژی
    </p>
    <div className='flex gap-4 flex-wrap mb-4'>
     <IconButton color='secondary'>
      <FaPhoneSquareAlt fontSize={'2rem'} />
     </IconButton>
     <IconButton color='error'>
      <TfiInstagram fontSize={'2rem'} />
     </IconButton>
     <IconButton color='info'>
      <FaTelegramPlane fontSize={'2rem'} />
     </IconButton>
    </div>
    <div className='flex gap-4 flex-wrap mb-8'>
     <Button
      size='large'
      sx={{
       minWidth: '10rem',
       background: (theme) =>
        `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
       '&:is(:hover,:focus)': {
        background: (theme) =>
         `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
       },
      }}
      variant='contained'
      color='secondary'
     >
      مشاهده خدمات
     </Button>
     <Button
      size='large'
      className='!bg-background'
      sx={{
       minWidth: '10rem',
      }}
      variant='outlined'
     >
      تماس باما
     </Button>
    </div>
    {/* <div className='flex gap-20 items-center flex-wrap'>
     <div className='flex flex-col gap-2 items-center'>
      <p className='font-medium text-base text-purple-600'>پروژه‌ها</p>
      <span className='text-purple-600 font-bold text-xl'>۱۲۰۰</span>
     </div>
     <div className='flex flex-col gap-2 items-center'>
      <p className='font-medium text-base text-purple-600'>مشتریان</p>
      <span className='text-purple-600 font-bold text-xl'>400</span>
     </div>
     <div className='flex flex-col gap-2 items-center'>
      <p className='font-medium text-base text-purple-600'>مشتریان</p>
      <span className='text-purple-600 font-bold text-xl'>400</span>
     </div>
    </div> */}
   </article>
   <div className='absolute bottom-0 start-0 end-0 flex justify-center pb-4'>
    <IconButton
     LinkComponent={Link}
     href='#services'
     className='!text-secondary'
    >
     <ScrollDownIcon width='1.8rem' fill='currentColor' />
    </IconButton>
   </div>
  </section>
 );
}
