import TagsWrapper from './components/TagsWrapper';
import AccessProvider from '../services/access/AccessProvider';
export default function page() {
 return (
  <section className='p-4 mx-auto w-[min(100%,80rem)]'>
   <AccessProvider formTitle='tags'>
    <TagsWrapper />
   </AccessProvider>
  </section>
 );
}
