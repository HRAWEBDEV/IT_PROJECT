'use client';
import { useState } from 'react';
import StorageIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import SecurityCameraIcon from '@/components/icons/SecurityCameraIcon';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';

const iconSize = '1.8rem';
const projects = [
 {
  type: 'tech',
  title: 'حوزه فناوری',
  icon: <StorageIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-sky-600 !dark:bg-sky-300',
 },
 {
  type: 'server',
  title: 'شبکه و سرور',
  icon: <WifiIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-teal-600 !dark:bg-teal-300',
 },
 {
  type: 'security',
  title: 'نظارت تصویری',
  icon: (
   <SecurityCameraIcon width={iconSize} height={iconSize} fill='currentColor' />
  ),
  color: '!bg-red-600 !dark:bg-red-300',
 },
 {
  type: 'support',
  title: 'پشتیبانی و نگهداری',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-orange-600 !dark:bg-orange-300',
 },
];

type Props = {
 onClose: () => void;
};

export default function Services({ onClose }: Props) {
 const [activeProject, setActiveProject] = useState<(typeof projects)[number]>(
  projects[0]
 );
 return (
  <section className='grid grid-cols-[max-content_1fr] w-[40rem]'>
   <div className='border-e border-neutral-300 dark:border-neutral-700 grid gap-4 pe-6'>
    {projects.map((item) => (
     <div
      onMouseEnter={() => setActiveProject(item)}
      onFocus={() => setActiveProject(item)}
      role='button'
      key={item.type}
      className='flex gap-2 items-center'
     >
      <div
       className={`flex-shrink-0 aspect-square w-[4rem] rounded-lg grid place-content-center text-background shadow-lg bg-neutral-400 dark:bg-neutral-500  bg-gradient-to-b from-transparent to-black/20 transition-colors ${
        item.type === activeProject.type ? item.color : ''
       }`}
      >
       {item.icon}
      </div>
      <div className={`flex-grow`}>
       <h3 className='font-medium text-[0.78rem]'>{item.title}</h3>
      </div>
     </div>
    ))}
   </div>
   <div className='flex gap-6 flex-wrap px-4 items-start justify-center'>
    {[1, 2, 3, 4, 5].map((item) => (
     <Link key={item} href={'#'} className='grid gap-2 group'
    onClick={onClose} 
     >
      <div className='rounded-full bg-gradient-to-b from-red-700 to-red-950 dark:from-red-600 dark:to-red-900 w-[5.5rem] h-[5.5rem] p-1'>
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
      <p className='text-center text-[0.75rem] font-medium w-[6rem]'>
       نصب دوربین های نظارتی
      </p>
     </Link>
    ))}
    <Link href='/co-services' className='grid gap-2 group' onClick={onClose}>
     <div className='rounded-full bg-gradient-to-b from-red-700 to-red-950 dark:from-red-600 dark:to-red-900 w-[5.5rem] h-[5.5rem] p-1'>
      <div className='h-full bg-background rounded-full overflow-hidden grid place-items-center transition-colors group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700'>
       <MoreHorizIcon fontSize='large' />
      </div>
     </div>
     <p className='text-center text-[0.75rem] font-medium w-[6rem]'>
      مشاهده همــه
     </p>
    </Link>
   </div>
  </section>
 );
}
