'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { GradientButton } from '@/components/Button/GradientButton';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Link from 'next/link';
import StorageIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import SecurityCameraIcon from '@/components/icons/SecurityCameraIcon';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const iconSize = '2.5rem';
const projects = [
 {
  title: 'حوزه فناوری',
  icon: <StorageIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-sky-600 dark:bg-sky-300',
 },
 {
  title: 'شبکه و سرور',
  icon: <WifiIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-teal-600 dark:bg-teal-300',
 },
 {
  title: 'نظارت تصویری',
  icon: (
   <SecurityCameraIcon width={iconSize} height={iconSize} fill='currentColor' />
  ),
  color: 'bg-red-600 dark:bg-red-300',
 },
 {
  title: 'پشتیبانی و نگهداری',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-orange-600 dark:bg-orange-300',
 },
];

export default function Services() {
 return (
  <section id='services' className='mb-14'>
   <div>
    <div className='container text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[50%] after:bottom-0 after:w-[10rem] after:translate-x-[50%] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[50%] before:bottom-[1px] before:w-[15rem] before:translate-x-[50%] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>خدمــــات</h2>
     </div>
     <p className='text-neutral-500 dark:text-neutral-200 w-[min(100%,40rem)] text-center leading-7 mb-10 container lg:text-base lg:leading-7'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p>
    </div>
    <div className='container mx-auto w-[min(100%,60rem)] mb-6'>
     <ul className='grid md:grid-cols-2'>
      {projects.map((item, i) => (
       <li key={item.title}>
        <Link
         className='flex gap-4 p-6 transition-colors hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 rounded-lg'
         href='#'
        >
         <div
          className={`flex-shrink-0 aspect-square w-[5.5rem] rounded-lg grid place-content-center text-background shadow-lg ${
           item.color
          } bg-gradient-to-b from-transparent to-black/20 ${
           (i + 1) % 2 != 0 ? 'md:order-2' : ''
          }`}
         >
          {item.icon}
         </div>
         <div className={`flex-grow ${(i + 1) % 2 != 0 ? 'md:order-1' : ''}`}>
          <h3 className='font-medium text-lg'>{item.title}</h3>
          <p className='text-justify text-[0.85rem] text-neutral-500 dark:text-neutral-200'>
           لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با فیک
           است، چاپگرها و متون بلکه روزنامه و مجله در
          </p>
         </div>
        </Link>
       </li>
      ))}
     </ul>
    </div>
    <div className='bg-neutral-100 dark:bg-neutral-800 py-8'>
     <div className='mb-4 container'>
      <Swiper
       spaceBetween={20}
       pagination
       modules={[Pagination]}
       breakpoints={{
        768: {
         slidesPerView: 2,
        },
        1024: {
         slidesPerView: 4,
        },
       }}
       className='!pb-10 [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--foreground))] [&]:[--swiper-pagination-color:hsl(var(--foreground))]'
      >
       {[1, 2, 3, 4, 5].map((item) => (
        <SwiperSlide key={item}>
         <Link href='#' className='block group'>
          <div className='overflow-hidden rounded-lg h-[10rem] lg:h-[13rem] mb-2 relative'>
           <div className='transition-all absolute top-[-5rem] group-hover:top-2 end-2 z-[2]'>
            <IconButton
             color='primary'
             className='!transition-colors !bg-neutral-300 hover:!bg-neutral-100'
            >
             <ShareOutlinedIcon />
            </IconButton>
           </div>
           <img
            style={{
             transition: 'all 0.5s ease',
            }}
            loading='lazy'
            className='h-full w-full object-cover object-center group-hover:scale-110 brightness-90 group-hover:brightness-100'
            src='/services/security-camera-installation.jpg'
            alt='services imageg'
           />
          </div>
          <div>
           <h3 className='font-medium text-lg mb-2'>نصب دوربین</h3>
           <p className='text-justify text-neutral-500 dark:text-neutral-200'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با فیک
            است، چاپگرها و متون بلکه روزنامه و مجله در
           </p>
          </div>
         </Link>
        </SwiperSlide>
       ))}
      </Swiper>
     </div>
     <div className='flex gap-4 justify-center'>
      <Button
       className='lg:w-[12rem] !bg-secondary-foreground'
       size='large'
       variant='outlined'
       color='warning'
      >
       <div className='flex gap-2'>
        <SupportAgentIcon />
        مشاوره خدمات
       </div>
      </Button>
      <GradientButton className='lg:w-[12rem]' size='large'>
       مشاهده تمام خدمات
      </GradientButton>
     </div>
    </div>
   </div>
  </section>
 );
}
