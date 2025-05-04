'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import BlogsGrid from './BlogsGrid';

export default function BlogsWrapper() {
 const { news } = useWebsiteDictionary() as {
  news: Dic;
 };
 return (
  <section className='bg-background rounded-lg p-4 border border-neutral-300 dark:border-neutral-700 mb-6'>
   <div className='mb-4'>
    <h3 className='font-medium text-base'>{news.blogsList as string}</h3>
   </div>
   <BlogsGrid />
  </section>
 );
}
