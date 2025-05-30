'use client';
import { type AboutUs } from '@/services/api-actions/globalApiActions';

type Props = {
 aboutUs: AboutUs;
};

export default function Content({ aboutUs }: Props) {
 return (
  <section className='container mt-6 mb-12'>
   <article
    className='ck-content'
    dangerouslySetInnerHTML={{ __html: aboutUs?.name || '' }}
   ></article>
  </section>
 );
}
