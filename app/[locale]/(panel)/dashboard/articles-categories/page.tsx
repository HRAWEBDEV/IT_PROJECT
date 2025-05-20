import AccessProvider from '@/app/[locale]/(panel)/dashboard/services/access/AccessProvider';
import CategoriesWrapper from './components/CategoriesWrapper';

export default function page() {
 return (
  <section className='p-4 mx-auto w-[min(100%,80rem)]'>
   <AccessProvider formTitle='articlesCategories'>
    <CategoriesWrapper />
   </AccessProvider>
  </section>
 );
}
