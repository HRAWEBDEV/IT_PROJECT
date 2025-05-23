'use client';
import Link from 'next/link';
import StorageIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import SecurityCameraIcon from '@/components/icons/SecurityCameraIcon';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
 type Service,
 type ServiceCategory,
} from '@/services/api-actions/globalApiActions';
import { WithDictionary } from '@/localization/locales';

const iconSize = '2.2rem';
const projects = [
 {
  type: 'technology',
  title: 'حوزه فناوری',
  icon: <StorageIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-sky-600 dark:bg-sky-300',
 },
 {
  type: 'network',
  title: 'شبکه و سرور',
  icon: <WifiIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-teal-600 dark:bg-teal-300',
 },
 {
  type: 'surveillance',
  title: 'نظارت تصویری',
  icon: (
   <SecurityCameraIcon width={iconSize} height={iconSize} fill='currentColor' />
  ),
  color: 'bg-red-600 dark:bg-red-300',
 },
 {
  type: 'support',
  title: 'پشتیبانی و نگهداری',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-orange-600 dark:bg-orange-300',
 },
] as const;

type Props = {
 services: Service[];
 servicesCategories: ServiceCategory[];
} & WithDictionary;

function Services({}: Props) {
 const [selectedService, setSelectedService] =
  useState<(typeof projects)[number]['type']>('technology');

 return (
  <section className='my-12 mb-20'>
   <section className='container mt-8 mb-20 border-b border-neutral-300 dark:border-neutral-700'>
    <ul className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
     {projects.map((item) => (
      <motion.li
       initial={{
        y: -20,
        opacity: 0,
       }}
       animate={{
        y: 0,
        opacity: 1,
       }}
       viewport={{ amount: 'some' }}
       transition={{
        duration: 0.5,
        ease: 'easeInOut',
       }}
       key={item.title}
      >
       <button
        className='transition-colors rounded-lg w-full'
        onClick={() => setSelectedService(item.type)}
       >
        <div className='flex flex-col lg:flex-row items-center gap-4 pb-3'>
         <div
          className={`flex-shrink-0 aspect-square w-[4.8rem] rounded-lg grid place-content-center text-background shadow-lg bg-neutral-400 dark:bg-neutral-600 ${
           selectedService === item.type && item.color
          } bg-gradient-to-b from-transparent to-black/20`}
         >
          {item.icon}
         </div>
         <div className={`flex-grow`}>
          <h3 className='font-medium text-base text-start'>{item.title}</h3>
         </div>
        </div>
        {/* use motion underline */}
        {item.type === selectedService && (
         <motion.div
          className={`h-[2px] w-full ${item.color}`}
          layoutId='underline'
          id='underline'
         />
        )}
       </button>
      </motion.li>
     ))}
    </ul>
   </section>
   <section className='container grid justify-items-center lg:justify-items-start grid-cols-2 lg:grid-cols-4 gap-8'>
    {[1, 2, 3, 4, 5].map((item) => (
     <Link key={item} href={'#'} className='grid gap-2 group'>
      <div className='rounded-full bg-gradient-to-b from-red-700 to-red-950 dark:from-red-600 dark:to-red-900 w-[8rem] h-[8rem] lg:w-[11rem] lg:h-[11rem] p-1'>
       <div className='h-full bg-background rounded-full overflow-hidden'>
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
      </div>
      <p className='text-center text-base font-medium w-[8rem] lg:w-[11rem]'>
       نصب دوربین های نظارتی
      </p>
     </Link>
    ))}
   </section>
  </section>
 );
}

export default Services;
