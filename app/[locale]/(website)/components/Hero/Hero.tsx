'use client';
import ScrollDownIcon from '@/components/icons/ScrollDownIcon';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { GradientButton } from '@/components/Button/GradientButton';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TfiInstagram } from 'react-icons/tfi';
import Link from 'next/link';
import { motion, Variants } from 'motion/react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const textVariants: Variants = {
 init: {
  opacity: 0,
  y: -20,
 },
 animate: {
  opacity: 1,
  y: 0,
 },
};

export default function Hero() {
 return (
  <section
   id='hero'
   className='relative min-h-[40rem] h-[calc(100vh_-_(var(--header-height)_+_var(--mobile-bottom-nav-height)))] mb-12 overflow-hidden'
  >
   <img
    className='absolute top-0 w-full bottom-2/4 h-[100%] object-cover object-center opacity-30 dark:hidden'
    src='/patterns/pattern-two.jpg'
    alt='pattern'
   />
   <div className='absolute end-[50%] -translate-x-1/2 -rotate-12 top-[1rem] w-[15rem] aspect-square dark:brightness-75'></div>
   <div className='absolute end-[50%] -translate-x-[50%] bottom-[-1rem] w-[30rem] lg:w-[35rem] aspect-square opacity-40 dark:hidden'>
    <img
     className='w-full h-full object-contain'
     src='/images/landing/landing-1.png'
     alt='landing image'
    />
   </div>
   <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-purple-100 dark:from-transparent dark:to-purple-950/30 dark:shadow-purple-700/5 blur-3xl'></div>
   <article className='absolute inset-0 container flex flex-col items-center h-full'>
    <motion.div
     variants={textVariants}
     initial={'init'}
     animate={'animate'}
     className='aspect-square w-[11rem] lg:w-[14rem] mb-2 2xl:w-[15rem]'
    >
     <img
      className='w-full h-full object-contain dark:brightness-75'
      src='/images/landing/landing-6.png'
      alt='landing image'
     />
    </motion.div>
    <motion.h1
     variants={textVariants}
     initial={'init'}
     animate={'animate'}
     className='text-3xl lg:text-4xl text-center leading-[1.7] lg:leading-[1.75] font-bold mb-2 lg:mb-4'
    >
     <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
      متخصص در حوزه فناوری
     </span>
     <span className='hidden lg:inline-block ms-4'> </span>
     <br className='lg:hidden' />
     <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
      اطلاعات و ارتباطات
     </span>
    </motion.h1>
    <motion.p
     variants={textVariants}
     initial={'init'}
     animate={'animate'}
     className='w-[min(100%,32rem)] text-center leading-7 mb-6 lg:text-base lg:leading-8'
    >
     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
     طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
     که لازم است، و برای شرایط فعلی تکنولوژی
    </motion.p>
    <motion.div
     initial={{
      opacity: 0,
     }}
     animate={{
      opacity: 1,
     }}
     className='flex gap-4 flex-wrap mb-4'
    >
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
    </motion.div>
    <div className='flex gap-4 flex-wrap mb-8'>
     <motion.div
      initial={{
       opacity: 0,
       x: 20,
      }}
      animate={{
       opacity: 1,
       x: 0,
      }}
     >
      <GradientButton
       size='large'
       sx={{
        minWidth: '10rem',
       }}
      >
       مشاهده خدمات
      </GradientButton>
     </motion.div>
     <motion.div
      initial={{
       opacity: 0,
       x: -20,
      }}
      animate={{
       opacity: 1,
       x: 0,
      }}
     >
      <Button
       size='large'
       className='!bg-background'
       sx={{
        minWidth: '10rem',
       }}
       variant='outlined'
      >
       <div className='flex gap-2 items-center'>
        <SupportAgentIcon />
        <span>تماس باما</span>
       </div>
      </Button>
     </motion.div>
    </div>
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
