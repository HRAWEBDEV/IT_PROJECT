'use client';
import { GradientButton } from '@/components/Button/GradientButton';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

const projects = [
 {
  title: 'نصب دوربین',
  image: '/services/security-camera-installation.jpg',
 },
 {
  title: 'نصب سرور',
  image: '/services/server-installation.jpg',
 },
 {
  title: 'نصب دزدگیر',
  image: '/services/security-camera-installation.jpg',
 },
];

export default function Services() {
 return (
  <section id='services'>
   <div className='container mb-12'>
    <header className='text-center mb-8'>
     <h2 className='text-2xl font-bold mb-4'>خدمـــــات</h2>
     <p className='w-[min(100%,32rem)] text-center leading-7 mb-10'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p>{' '}
    </header>
    <ul className='grid gap-4'>
     {projects.map((item) => (
      <li key={item.title} className='[&]:[--img-height:20rem]'>
       <Link
        href={'#'}
        className='overflow-hidden relative block border border-neutral-300 dark:border-neutral-700 rounded-[1.5rem]'
       >
        <div className='h-[--img-height]'>
         <img
          className='h-full w-full object-cover object-center'
          src={item.image}
          alt='services imageg'
         />
        </div>
        <div className='absolute start-[%50] -translate-y-[calc(var(--img-height)/8)] w-full h-full p-4 -skew-y-[7deg] rounded-ss-[3rem] bg-neutral-100 dark:bg-neutral-800 z-[1]'></div>
        <div className='p-4 relative z-[2] -mt-4'>
         <h3 className='text-xl font-medium text-primary-light mb-2'>
          {item.title}
         </h3>
         <p className='mb-8 text-neutral-500 dark:text-neutral-200'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده هدفابزارهای کاربردی می باشد
         </p>
         <div className='flex justify-between gap-4'>
          <div>
           <IconButton color='secondary'>
            <ShareOutlinedIcon />
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
       </Link>
      </li>
     ))}
    </ul>
   </div>
  </section>
 );
}
