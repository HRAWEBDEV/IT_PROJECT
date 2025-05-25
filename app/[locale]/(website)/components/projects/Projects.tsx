'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { GradientButton } from '@/components/Button/GradientButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { type Dic, type WithDictionary } from '@/localization/locales';
import { type Project } from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';

type Props = {
 projects: Project[];
} & WithDictionary;

export default function Projects({ dic, projects }: Props) {
 const { locale } = useAppConfig();
 const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
 });
 return (
  <section id='services' className='mb-14'>
   <div className='container'>
    <div className='text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[calc(50%_-_5rem)] after:bottom-0 after:w-[10rem] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[calc(50%_-_7.5rem)] before:bottom-[1px] before:w-[15rem] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>
       {(dic.projects as Dic).title as string}
      </h2>
     </div>
     {/* <p className='text-neutral-500 dark:text-neutral-200 w-[min(100%,40rem)] text-center leading-7 mb-10 container lg:text-base lg:leading-7'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p> */}
    </div>
    <div>
     <Swiper
      spaceBetween={20}
      pagination
      modules={[Pagination]}
      breakpoints={{
       768: {
        slidesPerView: 2,
       },
       1024: {
        slidesPerView: 3,
       },
       1258: {
        slidesPerView: 4,
       },
      }}
      className='!pb-10 [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--foreground))] [&]:[--swiper-pagination-color:hsl(var(--foreground))]'
     >
      <SwiperSlide key='intro' className='!hidden lg:!block self-center'>
       <div className='lg:flex items-center'>
        <img
         className='w-full max-w-[20rem]'
         src='/images/projects.png'
         alt='about-us-image'
         draggable={false}
        />
       </div>
      </SwiperSlide>
      {projects.map((item) => (
       <SwiperSlide key={item.id} className='[&]:[--img-height:18rem]'>
        <Link
         href={`/projects/${item.id}?name=${item.header}`}
         className='group overflow-hidden relative block border border-neutral-300 dark:border-neutral-700 rounded-[1.5rem]'
        >
         <div className='relative after:content-* after:absolute after:inset-0 after:bg-black/10 dark:after:bg-black/20 h-[--img-height]'>
          <img
           style={{
            transition: 'transform 0.5s ease',
           }}
           loading='lazy'
           className='h-full w-full object-cover object-center group-hover:scale-110'
           src='/services/server-installation.jpg'
           alt='projects image'
          />
         </div>
         <div className='absolute start-[%50] -translate-y-[calc(var(--img-height)/8)] w-full h-full p-4 -skew-y-[7deg] rounded-ss-[3rem] bg-neutral-100 dark:bg-neutral-800 z-[1]'></div>
         <div className='p-4 relative z-[2] -mt-4'>
          <div className='text-[0.7rem] flex gap-2 flex-wrap mb-3'>
           <div className='flex gap-1 items-center text-neutral-500 dark:text-neutral-200'>
            <CalendarMonthIcon fontSize='small' />
            <span>
             {dateFormatter.format(new Date(item.createDateTimeOffset))}
            </span>
           </div>
          </div>
          <div className='flex gap-2'>
           <h3 className='text-lg font-medium text-primary-dark mb-2'>
            {item.header}
           </h3>
          </div>
          <p className='mb-8 text-neutral-500 dark:text-neutral-200 text-justify'>
           {item.description}
          </p>
          <div className='flex justify-between gap-4'>
           <div className='flex gap-1'>
            <IconButton
             color='primary'
             className='!bg-sky-300/20 !dark:bg-sky-700/20'
            >
             <ShareOutlinedIcon />
            </IconButton>
           </div>
           <GradientButton>
            <div className='flex gap-3 items-center'>
             <span>{(dic.projects as Dic).continue as string}</span>
             <div className='text-neutral-300 group-hover:text-primary-foreground'>
              <VisibilityIcon />
             </div>
            </div>
           </GradientButton>
          </div>
         </div>
        </Link>
       </SwiperSlide>
      ))}
     </Swiper>
     <div className='flex justify-end'>
      <Button
       LinkComponent={Link}
       href='projects'
       className='min-w-[14rem]'
       size='large'
       variant='outlined'
       color='secondary'
      >
       <div className='flex gap-4'>
        <span className='font-medium'>
         {(dic.projects as Dic).viewAllProjects as string}
        </span>
        <div className='ltr:rotate-180'>
         <KeyboardBackspaceIcon />
        </div>
       </div>
      </Button>
     </div>
    </div>
   </div>
  </section>
 );
}
