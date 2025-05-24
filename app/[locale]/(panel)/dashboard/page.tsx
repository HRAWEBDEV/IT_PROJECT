'use client';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';

export default function page() {
 const { welcome } = useWebsiteDictionary() as {
  welcome: string;
 };
 return (
  <div className='flex justify-center items-center flex-col h-full'>
   <div className='text-primary-dark'>
    <div className='mb-8'>
     <img
      src='/images/logo.png'
      alt='dashboard logo'
      className='w-[20rem]'
      draggable={false}
     />
    </div>
    <p className='text-center text-2xl font-bold'>{welcome}</p>
   </div>
  </div>
 );
}
