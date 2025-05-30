'use client';
import Link from 'next/link';
import {
 getServiceCategories,
 getServices,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
 type Service,
 type ServiceCategory,
} from '@/services/api-actions/globalApiActions';
import { WithDictionary } from '@/localization/locales';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useAppConfig } from '@/services/app-config/appConfig';
import CircularProgress from '@mui/material/CircularProgress';
import ImageWrapper from '@/components/ImageWrapper';
import { projects } from '@/app/[locale]/(website)/utils/servicesColors';

type Props = {
 serverServices: Service[];
 serverServicesCategories: ServiceCategory[];
} & WithDictionary;

function Services({ serverServices, serverServicesCategories }: Props) {
 const { locale } = useAppConfig();
 const [selectedCategoryID, setSelectedCategoryID] = useState<
  ServiceCategory['id'] | null
 >(null);

 const {
  data: serviceCategories = serverServicesCategories,
  isLoading: serviceCategoriesLoading,
 } = useQuery({
  initialData: serverServicesCategories,
  queryKey: ['serviceCategories'],
  async queryFn({ signal }) {
   const servicesCategories = await getServiceCategories({
    locale,
    signal,
   }).then((res) => res.data.payload.ServiceCategories);
   if (servicesCategories.length) {
    setSelectedCategoryID(serviceCategories[0].id);
   }
   return servicesCategories;
  },
 });

 const { data: services = serverServices, isLoading: servicesLoading } =
  useQuery({
   initialData: serverServices,
   enabled: !!selectedCategoryID,
   queryKey: ['services', selectedCategoryID],
   queryFn({ signal }) {
    return getServices({
     locale,
     signal,
     serviceCategoryID: selectedCategoryID!,
     serviceStateID: 2,
     showForCards: false,
    }).then((res) => res.data.payload.Services);
   },
  });

 return (
  <>
   {serviceCategoriesLoading ? (
    <div className='min-h-[20rem] flex justify-center items-center'>
     <CircularProgress />
    </div>
   ) : (
    <section className='my-12 mb-20'>
     <section className='container mt-8 mb-20'>
      <Swiper
       slidesPerView={2}
       spaceBetween={20}
       pagination
       modules={[Pagination]}
       breakpoints={{
        1024: {
         slidesPerView: 4,
        },
       }}
       className='!pb-10 [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--foreground))] [&]:[--swiper-pagination-color:hsl(var(--foreground))]'
      >
       {serviceCategories.map((item, i) => {
        const targeProject = projects[i] || projects[0];
        return (
         <SwiperSlide key={item.id}>
          <motion.li
           onClick={() => setSelectedCategoryID(item.id)}
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
           className='border-b border-neutral-300 dark:border-neutral-700'
          >
           <button className='transition-colors rounded-lg w-full'>
            <div className='flex flex-col lg:flex-row items-center gap-4 pb-3'>
             <div
              className={`flex-shrink-0 aspect-square w-[4.8rem] rounded-lg grid place-content-center text-background shadow-lg bg-neutral-400 dark:bg-neutral-600 ${
               selectedCategoryID === item.id && targeProject.color
              } bg-gradient-to-b from-transparent to-black/20`}
             >
              {targeProject.icon}
             </div>
             <div className={`flex-grow`}>
              <h3 className='font-medium text-base text-start'>{item.name}</h3>
             </div>
            </div>
            {/* use motion underline */}
            {selectedCategoryID === item.id && (
             <motion.div
              className={`h-[2px] w-full ${targeProject.color}`}
              layoutId='underline'
              id='underline'
             />
            )}
           </button>
          </motion.li>
         </SwiperSlide>
        );
       })}
      </Swiper>
     </section>
     {servicesLoading ? (
      <div className='min-h-[10rem] flex justify-center items-center'>
       <CircularProgress />
      </div>
     ) : (
      <section className='container grid justify-items-center lg:justify-items-start grid-cols-2 lg:grid-cols-4 gap-8'>
       {services.map((item) => (
        <Link
         key={item.id}
         href={`/co-services/${item.id}?name=${item.header}`}
         className='gap-2 w-[8.5rem] flex flex-col group items-center'
        >
         <div className='rounded-full bg-gradient-to-b from-red-700 to-red-950 dark:from-red-600 dark:to-red-900 w-[8rem] h-[8rem] lg:w-[11rem] lg:h-[11rem] p-1'>
          <div className='h-full bg-background rounded-full overflow-hidden'>
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
         </div>
         <p className='text-center text-base font-medium leading-6'>
          {item.header}
         </p>
        </Link>
       ))}
      </section>
     )}
    </section>
   )}
  </>
 );
}

export default Services;
