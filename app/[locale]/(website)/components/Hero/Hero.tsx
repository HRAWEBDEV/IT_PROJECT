'use client';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { TfiInstagram } from 'react-icons/tfi';

export const Hero = () => {
 return (
  <section className='relative min-h-[30rem] h-[calc(100vh_-_(var(--header-height)_+_var(--mobile-bottom-nav-height)))]'>
   <div className='h-full bg-gradient-to-b from-white to-purple-100/90 dark:from-transparent dark:to-purple-700/5'></div>
   <article className='absolute inset-0 container flex flex-col items-center justify-center h-full'>
    <h1 className='text-3xl text-center leading-[1.7] font-bold mb-6'>
     <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
      متخصص در حوزه فناوری
     </span>
     <br />
     <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
      اطلاعات و ارتباطات
     </span>
    </h1>
    <p className='w-[min(100%,32rem)] text-center leading-7 mb-10'>
     ---- با کادری مجرب و تجهیزات بروز با بیش از 10 سال سابقه درخشان در زمینه
     زیرساخت شبکه های کامپیوتری و مخابراتی و همچنین سیستم های حفاظتی و نظارتی
     آماده خدمت رسانی به شرکت ها و موسسات می باشد
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
    <div className='flex gap-4 flex-wrap'>
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
   </article>
  </section>
 );
};
