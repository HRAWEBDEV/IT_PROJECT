import ServicesCategoriesWrapper from './components/ServicesCategoriesWrapper';
import AccessProvider from '../services/access/AccessProvider';

export default function page() {
 return (
  <section className='p-4 mx-auto w-[min(100%,80rem)]'>
   <AccessProvider formTitle='servicesCategories'>
    <ServicesCategoriesWrapper />
   </AccessProvider>
  </section>
 );
}
