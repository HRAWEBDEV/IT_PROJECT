'use client';
import { type Blog } from '@/services/api-actions/globalApiActions';

type Props = {
 blog: Blog | null;
};

export default function Content({ blog }: Props) {
 return (
  <article
   className='my-12 container ck-content'
   dangerouslySetInnerHTML={{ __html: blog?.body || '' }}
  ></article>
 );
}
