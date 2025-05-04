'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import CategoriesGrid from './CategoriesGrid';

export default function CategoriesWrapper() {
 const { news } = useWebsiteDictionary() as {
  news: Dic;
 };
 return (
  <section className='bg-background rounded-lg p-4 border border-neutral-300 dark:border-neutral-700'>
   <div className='mb-4'>
    <h3 className='font-medium text-base'>{news.categories as string}</h3>
   </div>
   <CategoriesGrid />
  </section>
 );
}
