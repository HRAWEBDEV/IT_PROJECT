'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { GradientButton } from '@/components/Button/GradientButton';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import IconButton from '@mui/material/IconButton';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Link from 'next/link';
import { motion } from 'motion/react';
import { type Dic, type WithDictionary } from '@/localization/locales';
import {
 type ServiceCategory,
 type Service,
} from '@/services/api-actions/globalApiActions';
import ImageWrapper from '@/components/ImageWrapper';

const iconSize = '2.5rem';
const projects = [
 {
  title: '1',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-sky-600 dark:bg-sky-300',
 },
 {
  title: '2',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-teal-600 dark:bg-teal-300',
 },
 {
  title: '3',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-red-600 dark:bg-red-300',
 },
 {
  title: '4',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-blue-600 dark:bg-blue-300',
 },
 {
  title: '5',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-purple-600 dark:bg-purple-300',
 },
 {
  title: '6',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-yellow-600 dark:bg-yellow-300',
 },
];

type Props = {
 services: Service[];
 servicesCategories: ServiceCategory[];
} & WithDictionary;

export default function Services({ dic, services, servicesCategories }: Props) {
 return (
  <section id='services' className='mb-14'>
   <div>
    <div className='container text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[calc(50%_-_5rem)] after:bottom-0 after:w-[10rem] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[calc(50%_-_7.5rem)] before:bottom-[1px] before:w-[15rem] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <motion.h1
       initial={{
        y: -10,
        opacity: 0,
       }}
       whileInView={{
        y: 0,
        opacity: 1,
       }}
       viewport={{ amount: 'some' }}
       transition={{
        duration: 0.5,
        ease: 'easeInOut',
       }}
       className='text-2xl font-bold lg:text-3xl'
      >
       {(dic.services as Dic).title as string}
      </motion.h1>
     </div>
     <p className='text-neutral-500 dark:text-neutral-200 w-[min(100%,40rem)] text-center leading-7 mb-10 container lg:text-base lg:leading-7'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p>
    </div>
    <div className='container mx-auto w-[min(100%,60rem)] mb-6'>
     <ul className='grid md:grid-cols-2'>
      {servicesCategories.map((item, i) => {
       const targeProject = projects[i] || projects[0];
       return (
        <motion.li
         initial={{
          y: -20,
         }}
         whileInView={{
          y: 0,
         }}
         viewport={{ amount: 'some' }}
         transition={{
          duration: 0.5,
          ease: 'easeInOut',
         }}
         key={item.id}
        >
         <Link
          className='flex gap-4 p-6 transition-colors hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 rounded-lg'
          href='/co-services'
         >
          <div
           className={`flex-shrink-0 aspect-square w-[5.5rem] rounded-lg grid place-content-center text-background shadow-lg ${
            targeProject.color
           } bg-gradient-to-b from-transparent to-black/20 ${
            (i + 1) % 2 != 0 ? 'md:order-2' : ''
           }`}
          >
           {targeProject.icon}
          </div>
          <div className={`flex-grow ${(i + 1) % 2 != 0 ? 'md:order-1' : ''}`}>
           <h3 className='font-medium text-lg'>{item.name}</h3>
           <p className='text-justify text-[0.85rem] text-neutral-500 dark:text-neutral-200'>
            {item.description}
           </p>
          </div>
         </Link>
        </motion.li>
       );
      })}
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
       {services.map((item) => {
        const serviceLink = `/co-services/${item.id}?name=${item.header}`;
        return (
         <SwiperSlide key={item.id}>
          <Link href={serviceLink} className='block group'>
           <div className='overflow-hidden rounded-lg h-[10rem] lg:h-[13rem] mb-2 relative'>
            <div className='transition-all absolute top-[-5rem] group-hover:top-2 end-2 z-[2]'>
             <IconButton
              color='primary'
              className='!transition-colors !bg-neutral-300 hover:!bg-neutral-100'
              onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               if (!navigator.share) return;
               navigator.share({
                title: item.header,
                text: item.description,
                url: serviceLink,
               });
              }}
             >
              <ShareOutlinedIcon />
             </IconButton>
            </div>
            <ImageWrapper
             img={{
              style: {
               transition: 'all 0.5s ease',
              },
              loading: 'lazy',
              className:
               'h-full w-full object-cover object-center group-hover:scale-110 brightness-90 group-hover:brightness-100',
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/${item.imageUrl}`,
              alt: 'services imageg',
             }}
             wrapper={{
              className: 'h-full w-full',
             }}
            />
           </div>
           <div>
            <h3 className='font-medium text-lg mb-2'>{item.header}</h3>
            <p className='text-justify text-neutral-500 dark:text-neutral-200'>
             {item.description}
            </p>
           </div>
          </Link>
         </SwiperSlide>
        );
       })}
      </Swiper>
     </div>
     <div className='flex gap-4 justify-center'>
      <GradientButton
       LinkComponent={Link}
       href='/co-services'
       className='lg:w-[12rem]'
       size='large'
      >
       <span>{(dic.services as Dic).viewAllServices as string}</span>
      </GradientButton>
     </div>
    </div>
   </div>
  </section>
 );
}
