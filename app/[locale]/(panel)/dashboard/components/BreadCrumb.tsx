'use client';
import { usePathname } from 'next/navigation';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function BreadCrumb() {
 const pathname = usePathname();
 const { navigation } = useWebsiteDictionary() as {
  navigation: Dic;
 };
 const lastSection = pathname.split('/').at(-1);

 return lastSection !== 'dashboard' ? (
  <div className='p-4 bg-neutral-300 dark:bg-neutral-700 '>
   <Breadcrumbs>
    <div className='font-medium text-base'>
     {navigation[lastSection || ''] as string}
    </div>
   </Breadcrumbs>
  </div>
 ) : null;
}
