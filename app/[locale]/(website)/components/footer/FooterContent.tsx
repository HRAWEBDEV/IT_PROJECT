'use client';
import Button from '@mui/material/Button';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TfiInstagram } from 'react-icons/tfi';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Link from 'next/link';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 type ProjectCategory,
 type ServiceCategory,
} from '@/services/api-actions/globalApiActions';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Owner } from '@/services/api-actions/authApiActionts';

type Props = {
 servicesCategories: ServiceCategory[];
 projectCategories: ProjectCategory[];
 owner: Owner | null;
};

export default function FooterContent({
 servicesCategories,
 projectCategories,
 owner,
}: Props) {
 const dic = useWebsiteDictionary();

 return (
  <footer className='pt-8 bg-neutral-300 dark:bg-neutral-700'>
   <div className='container'>
    <div className='flex justify-end mb-4'>
     <Button
      variant='outlined'
      className='w-[10rem] !border-neutral-600 !text-neutral-600 dark:!border-neutral-400 dark:!text-neutral-400'
      onClick={() => {
       document.documentElement.scrollTop = 0;
      }}
     >
      <div className='flex gap-2 items-center'>
       <span>{(dic.footer as Dic).goUp as string}</span>
       <ArrowUpwardIcon fontSize='small' />
      </div>
     </Button>
    </div>
    <section className='grid gap-10 lg:grid-cols-3'>
     <div>
      <div>
       <h4 className='text-2xl font-bold mb-2'>
        <ApartmentIcon fontSize='large' className='me-4' color='primary' />
        <span className='dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-400 dark:text-transparent dark:bg-clip-text'>
         {(dic.footer as Dic).company as string}
        </span>
        <span className='inline-block ms-4'> </span>
        <br className='hidden' />
        <span className='bg-gradient-to-br from-sky-600 to-teal-400 dark:from-sky-400 dark:to-teal-300 text-transparent bg-clip-text'>
         {owner?.ownerName}
        </span>
       </h4>
       <p className='w-[min(100%,32rem)] leading-7 mb-6'>
        {owner?.descriptionName}
       </p>
       <div className='mb-4'>
        <div className='flex gap-2 items-center mb-4'>
         <FmdGoodIcon fontSize='large' color='error' />
         <p className='font-medium'>{owner?.addressName}</p>
        </div>
        {owner?.email && (
         <div className='flex gap-2 items-center mb-4'>
          <AlternateEmailIcon fontSize='large' color='error' />
          <p className='font-medium'>{owner?.email}</p>
         </div>
        )}
        <div className='grid grid-cols-2 gap-2'>
         {owner?.telephone1 && (
          <div className='flex gap-2 items-center'>
           <PhoneAndroidIcon fontSize='large' color='secondary' />
           <p className='font-medium'>{owner?.telephone1}</p>
          </div>
         )}
         {owner?.telephone2 && (
          <div className='flex gap-2 items-center'>
           <PhoneAndroidIcon fontSize='large' color='secondary' />
           <p className='font-medium'>{owner?.telephone2}</p>
          </div>
         )}
         {owner?.telephone3 && (
          <div className='flex gap-2 items-center'>
           <PhoneAndroidIcon fontSize='large' color='secondary' />
           <p className='font-medium'>{owner?.telephone3}</p>
          </div>
         )}
         {owner?.cellphone1 && (
          <div className='flex gap-2 items-center'>
           <PhoneEnabledIcon fontSize='large' color='secondary' />
           <p className='font-medium'>{owner?.cellphone1}</p>
          </div>
         )}
         {owner?.cellphone2 && (
          <div className='flex gap-2 items-center'>
           <PhoneEnabledIcon fontSize='large' color='secondary' />
           <p className='font-medium'>{owner?.cellphone2}</p>
          </div>
         )}
         {owner?.cellphone3 && (
          <div className='flex gap-2 items-center'>
           <PhoneEnabledIcon fontSize='large' color='secondary' />
           <p className='font-medium'>{owner?.cellphone3}</p>
          </div>
         )}
        </div>
       </div>
       <article className='flex items-center gap-2'>
        <div className='flex gap-2 flex-wrap'>
         <IconButton color='warning'>
          <FaPhoneSquareAlt fontSize={'1.5rem'} />
         </IconButton>
         <IconButton color='secondary'>
          <IoLogoWhatsapp fontSize={'1.5rem'} />
         </IconButton>
         <IconButton color='error'>
          <TfiInstagram fontSize={'1.5rem'} />
         </IconButton>
         <IconButton color='info'>
          <FaTelegramPlane fontSize={'1.5rem'} />
         </IconButton>
        </div>
       </article>
      </div>
     </div>
     <div>
      <h4 className='font-medium text-lg mb-4'>
       {(dic.footer as Dic).services as string}
      </h4>
      <ul className='grid gap-4'>
       {servicesCategories.slice(0, 7).map((item) => (
        <li key={item.id}>
         <Link
          href={`/co-services?categoryID=${item.id}&categoryName=${item.name}`}
          className='flex items-center gap-1'
         >
          <div className='ltr:rotate-180'>
           <KeyboardDoubleArrowLeftIcon color='error' />
          </div>
          <span>{item.name}</span>
         </Link>
        </li>
       ))}
      </ul>
     </div>
     <div>
      <h4 className='font-medium text-lg mb-4'>
       {(dic.footer as Dic).projects as string}
      </h4>
      <ul className='grid gap-4'>
       {projectCategories.slice(0, 7).map((item) => (
        <li key={item.id}>
         <Link
          href={`/projects?categoryID=${item.id}&categoryName=${item.name}`}
          className='flex items-center gap-1'
         >
          <div className='ltr:rotate-180'>
           <KeyboardDoubleArrowLeftIcon color='error' />
          </div>
          <span>{item.name}</span>
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </section>
   </div>
   <div className='py-2 mt-2 border-t border-neutral-400 dark:border-neutral-600'>
    <div className='text-center'>
     <CopyrightIcon />
     <span>{(dic.footer as Dic).allRightsReserved as string}</span>
     {new Date().getFullYear()}
    </div>
   </div>
  </footer>
 );
}
