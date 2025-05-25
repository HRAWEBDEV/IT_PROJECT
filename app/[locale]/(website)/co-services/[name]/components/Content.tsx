'use client';
import { useAppConfig } from '@/services/app-config/appConfig';
import { WithDictionary } from '@/localization/locales';
import { type Service } from '@/services/api-actions/globalApiActions';

type Props = {
 service: Service | null;
};

export default function Content({ service, dic }: Props & WithDictionary) {
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
     {dateFormatter.format(new Date(service?.createDateTimeOffset || ''))}
    </span>
   </div>
   <article
    className='ck-content'
    dangerouslySetInnerHTML={{ __html: service?.body || '' }}
   ></article>
  </section>
 );
}
