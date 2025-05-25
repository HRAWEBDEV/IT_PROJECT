'use client';
import { type Blog } from '@/services/api-actions/globalApiActions';
import { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

type Props = {
 blog: Blog | null;
};

export default function Banner({ blog }: Props) {
 useEffect(() => {
  window.scrollTo(0, 0);
 }, []);
 const imageUrl = `${
  (process.env.NEXT_PUBLIC_BASE_URL || '') + blog?.imageUrl
 }`;
 return (
  <section className='h-[12rem] lg:h-[18rem] relative'>
   <div className='absolute inset-0 z-[-1]'>
    <img
     src={imageUrl}
     alt='banner'
     className='w-full h-full object-cover object-center'
     draggable={false}
    />
   </div>
   <div className='h-full flex flex-col justify-center bg-gradient-to-b from-black/20 to-black/65'>
    <h1 className='text-center font-bold text-4xl lg:text-6xl text-primary-foreground mb-8  bg-cover bg-center'>
     {blog?.header}
    </h1>
    <div className='flex justify-center text-primary-foreground'>
     <Breadcrumbs className='!text-primary-foreground'>
      <Link href='/'>خانه</Link>
      <Link href='/articles'>مقالات</Link>
      <Link href={'#'}>{blog?.header}</Link>
     </Breadcrumbs>
    </div>
   </div>
  </section>
 );
}
