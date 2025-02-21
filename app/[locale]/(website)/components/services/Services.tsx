'use client';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

const projects = [
 {
  title: 'نصب دوربین',
 },
 {
  title: 'نصب سرور',
 },
 {
  title: 'نصب دزدگیر',
 },
 {
  title: 'نصب سی پی یو',
 },
];

export default function Services() {
 return (
  <section id='services'>
   <div className='container py-12'>
    <header className='text-center mb-8'>
     <h2 className='text-2xl font-bold'>خدمـــــات</h2>
    </header>
    <ul className='grid gap-4'>
     {projects.map((item) => (
      <li key={item.title} className='[&]:[--img-height:15rem]'>
       <div className='overflow-hidden relative block border border-neutral-300 dark:border-neutral-700 rounded-[1.5rem]'>
        <div className='h-[--img-height]'></div>
        <div className='absolute start-[%50] -translate-y-[calc(var(--img-height)/7)] w-full h-full p-4 -skew-y-[9deg] rounded-ss-[3rem] bg-neutral-100 dark:bg-neutral-800 z-[1]'></div>
        <div className='p-4 relative z-[2] -mt-4'>
         <h3 className='text-lg font-medium text-primary-light mb-2'>
          {item.title}
         </h3>
         <p className='mb-8 text-neutral-500 dark:text-neutral-200'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده هدفابزارهای کاربردی می باشد
         </p>
         <div className='flex justify-between gap-4'>
          <div>
           <IconButton color='primary'>
            <ShareOutlinedIcon />
           </IconButton>
          </div>
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
           <div className='flex gap-3 items-center'>
            <span>ادامه مطالب</span>
            <VisibilityIcon />
           </div>
          </Button>
         </div>
        </div>
       </div>
      </li>
     ))}
    </ul>
   </div>
  </section>
 );
}
