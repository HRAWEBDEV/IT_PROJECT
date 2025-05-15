'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
// import { useAppConfig } from '@/services/app-config/appConfig';

export default function ArticleCommentsWrapper() {
 // const { locale } = useAppConfig();
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
 };

 return (
  <div>
   <h1 className='font-bold text-2xl mb-4'>
    {articlesComments.title as string}
   </h1>
  </div>
 );
}
