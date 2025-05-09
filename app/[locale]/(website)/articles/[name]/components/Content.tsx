import { type Blog } from '@/services/api-actions/globalApiActions';

type Props = {
 blog: Blog | null;
};

export default function Content({ blog }: Props) {
 return (
  <article
   className='mb-12 container'
   dangerouslySetInnerHTML={{ __html: blog?.body || '' }}
  ></article>
 );
}
