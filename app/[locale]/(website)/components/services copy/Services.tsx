'use client';
import { GradientButton } from '@/components/Button/GradientButton';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import StorageIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
// import HandymanIcon from '@mui/icons-material/Handyman';

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
 {
  title: 'نصب',
  image: '/services/security-camera-installation.jpg',
 },
];

export default function Services() {
 return (
  <section id='services'>
   <div className='container mb-12'>
    <div className='text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[50%] after:bottom-0 after:w-[10rem] after:translate-x-[50%] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[50%] before:bottom-[1px] before:w-[15rem] before:translate-x-[50%] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>خدمـــــات</h2>
     </div>
     <p className='text-neutral-500 dark:text-neutral-200 w-[min(100%,40rem)] text-center leading-7 mb-10 container lg:text-base lg:leading-7'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p>
    </div>
    <div className='mx-auto w-[min(100%,60rem)]'>
     <ul className='grid gap-8 grid-cols-2'>
      <li>
       <Link className='flex gap-4' href='#'>
        <div className='flex-grow'>
         <h3 className='font-medium text-lg'>نصب سرور</h3>
         <p className='text-justify text-[0.85rem]'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
         </p>
        </div>
        <div className='flex-shrink-0 aspect-square w-[6rem] bg-red-600 rounded-lg grid place-content-center text-background'>
         <StorageIcon fontSize='large' />
        </div>
       </Link>
      </li>
      <li>
       <Link className='flex gap-4' href='#'>
        <div className='flex-grow order-2'>
         <h3 className='font-medium text-lg'>نصب سرور</h3>
         <p className='text-justify text-[0.85rem]'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
         </p>
        </div>
        <div className='flex-shrink-0 aspect-square w-[6rem] bg-teal-600 rounded-lg grid place-content-center text-background order-1'>
         <WifiIcon fontSize='large' />
        </div>
       </Link>
      </li>
     </ul>
    </div>
   </div>
  </section>
 );
}
