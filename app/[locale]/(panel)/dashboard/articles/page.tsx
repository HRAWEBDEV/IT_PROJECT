import ArticlesWrapper from './components/ArticlesWrapper';
import AccessProvider from '../services/access/AccessProvider';

export default async function page() {
 return (
  <section className='p-4 mx-auto w-[min(100%,80rem)]'>
   <AccessProvider formTitle='articlesList'>
    <ArticlesWrapper />
   </AccessProvider>
  </section>
 );
}
