'use client';
import { type Blog } from '@/services/api-actions/globalApiActions';
import dynamic from 'next/dynamic';
const ContentEditor = dynamic(
 () => import('@/components/ck-editor/ContentEditor'),
 {
  ssr: false,
 }
);

type Props = {
 blog: Blog | null;
};

export default function Content({ blog }: Props) {
 return (
  <article className='my-12 container'>
   {/* <ContentEditor data={blog?.body || ''} /> */}
  </article>
 );
}
