import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function Banner() {
 return (
  <section className='h-[12rem] lg:h-[17rem] bg-[url(/images/services/fiber.jpg)] bg-cover bg-center'>
   <div className='h-full flex flex-col justify-center bg-gradient-to-b from-black/20 to-black/65'>
    <h1 className='text-center font-bold text-4xl lg:text-6xl text-background mb-8  bg-cover bg-center'>
     فیبر نـــوری
    </h1>
    <div className='flex justify-center text-background'>
     <Breadcrumbs className='!text-background'>
      <Link href='/'>خانه</Link>
      <Link href='/co-services'>خدمات</Link>
      <Link href='/services/fiber-optic'>فیبر نوری</Link>
     </Breadcrumbs>
    </div>
   </div>
  </section>
 );
}
