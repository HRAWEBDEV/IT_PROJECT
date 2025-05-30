'use client';
import { useState } from 'react';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';
import { type Dic, type WithDictionary } from '@/localization/locales';
import { useQuery } from '@tanstack/react-query';
import {
 getServiceCategories,
 getServices,
} from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const iconSize = '1.8rem';
const projects = [
 {
  type: 'tech',
  title: 'حوزه فناوری',
  // icon: <StorageIcon sx={{ fontSize: iconSize }} />,
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-sky-600 !dark:bg-sky-300',
 },
 {
  type: 'server',
  title: 'شبکه و سرور',
  // icon: <WifiIcon sx={{ fontSize: iconSize }} />,
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-teal-600 !dark:bg-teal-300',
 },
 {
  type: 'security',
  title: 'نظارت تصویری',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  // icon: (
  //  <SecurityCameraIcon width={iconSize} height={iconSize} fill='currentColor' />
  // ),
  color: '!bg-red-600 !dark:bg-red-300',
 },
 {
  type: 'support',
  title: 'پشتیبانی و نگهداری',
  icon: <MiscellaneousServicesIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-orange-600 !dark:bg-orange-300',
 },
 {
  type: 'all',
  title: 'همه سرویس ها',
  icon: <MoreVertIcon sx={{ fontSize: iconSize }} />,
  color: '!bg-orange-600 !dark:bg-orange-300',
 },
];

type Props = {
 onClose: () => void;
} & WithDictionary;

export default function Services({ onClose, dic }: Props) {
 const { locale } = useAppConfig();
 const [selectedServiceCategoryID, setSelectedServiceCategoryID] = useState<
  number | null
 >(null);

 const { data: serviceCategories = [], isLoading: isServiceCategoriesLoading } =
  useQuery({
   queryKey: ['header', 'service-categories'],
   async queryFn({ signal }) {
    const categories = await getServiceCategories({
     locale,
     signal,
    }).then((res) => res.data.payload.ServiceCategories);
    if (categories.length > 0) {
     setSelectedServiceCategoryID(categories[0].id);
    }
    return categories;
   },
  });

 const { data: services = [], isLoading: isServicesLoading } = useQuery({
  queryKey: ['header', 'services', selectedServiceCategoryID],
  enabled: !!selectedServiceCategoryID,
  async queryFn({ signal }) {
   return getServices({
    locale,
    signal,
    serviceCategoryID: selectedServiceCategoryID!,
    serviceStateID: 2,
    showForCards: false,
   }).then((res) => res.data.payload.Services);
  },
 });

 return (
  <section className='grid grid-cols-[max-content_1fr] w-[40rem] min-h-[15rem]'>
   {isServiceCategoriesLoading ? (
    <div className='grid col-span-full place-items-center h-full'>
     <CircularProgress />
    </div>
   ) : (
    <>
     <div className='border-e border-neutral-300 dark:border-neutral-700 grid content-start gap-4 pe-6'>
      {serviceCategories.map((item, i) => (
       <div
        onMouseEnter={() => setSelectedServiceCategoryID(item.id)}
        onFocus={() => setSelectedServiceCategoryID(item.id)}
        role='button'
        key={item.id}
        className='flex gap-2 items-center'
       >
        <div
         className={`flex-shrink-0 aspect-square w-[4rem] rounded-lg grid place-content-center text-background shadow-lg bg-neutral-400 dark:bg-neutral-500  bg-gradient-to-b from-transparent to-black/20 transition-colors ${
          item.id === selectedServiceCategoryID ? projects[i].color : ''
         }`}
        >
         {projects[i].icon}
        </div>
        <div className={`flex-grow`}>
         <h3 className='font-medium text-[0.78rem]'>{item.name}</h3>
        </div>
       </div>
      ))}
     </div>
     {isServicesLoading ? (
      <div className='grid place-items-center h-full'>
       <CircularProgress />
      </div>
     ) : (
      <div className='flex gap-6 flex-wrap px-4 items-start justify-center'>
       {services.slice(0, 5).map((item) => (
        <Link
         key={item.id}
         href={`/co-services/${item.id}?name=${item.header}`}
         className='gap-2 group w-[6rem] flex flex-col items-center'
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
         <p className='text-center text-[0.75rem] font-medium leading-5'>
          {item.header}
         </p>
        </Link>
       ))}
       <Link
        href='/co-services'
        className='flex flex-col items-center gap-2 group w-[6rem]'
        onClick={onClose}
       >
        <div className='rounded-full bg-gradient-to-b from-red-700 to-red-950 dark:from-red-600 dark:to-red-900 w-[5.5rem] h-[5.5rem] p-1'>
         <div className='h-full bg-background rounded-full overflow-hidden grid place-items-center transition-colors group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700'>
          <MoreHorizIcon fontSize='large' />
         </div>
        </div>
        <p className='text-center text-[0.75rem] font-medium'>
         {(dic.navigation as Dic).viewAll as string}
        </p>
       </Link>
      </div>
     )}
    </>
   )}
  </section>
 );
}
