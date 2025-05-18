'use client';
import { type Blog } from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import { WithDictionary } from '@/localization/locales';

type Props = {
 blog: Blog | null;
};

export default function Content({ blog, dic }: Props & WithDictionary) {
 const { locale } = useAppConfig();
 const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
 });
 return (
  <section className='container mt-6 mb-12'>
   <div className='mb-8'>
    <span>{dic.publishedAt as string}</span>
    <span className='font-medium'>
     {dateFormatter.format(new Date(blog?.createDateTimeOffset || ''))}
    </span>
   </div>
   <article
    className='ck-content'
    dangerouslySetInnerHTML={{ __html: blog?.body || '' }}
   ></article>
  </section>
 );
}
