'use client';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Services() {
 return (
  <section id='services'>
   <div className='container py-12'>
    <header className='text-center mb-8'>
     <h2 className='text-2xl font-bold'>خدمات</h2>
    </header>
    <ul className='grid gap-4'>
     <li className='[&]:[--img-height:15rem]'>
      <Link
       className='overflow-hidden relative block border border-neutral-300 rounded-[1.5rem]'
       href={'#'}
      >
       <div className='h-[--img-height]'></div>
       <div className='absolute start-[%50] -translate-y-[calc(var(--img-height)/7)] w-full h-full p-4 -skew-y-[9deg] rounded-ss-[3rem] bg-neutral-100 z-[1]'></div>
       <div className='p-4 relative z-[2] -mt-4'>
        <h3 className='text-lg font-medium text-primary mb-2'>نصب دوربین</h3>
        <p className='mb-8 text-neutral-500'>
         لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
         هدفابزارهای کاربردی می باشد
        </p>
        <div className='flex justify-end'>
         <Button
          sx={{
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
          ادامه مطالب
         </Button>
        </div>
       </div>
      </Link>
     </li>
    </ul>
   </div>
  </section>
 );
}
