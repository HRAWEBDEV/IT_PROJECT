import AccessProvider from '../services/access/AccessProvider';
import ServicesWrapper from './components/ServicesWrapper';
export default async function page() {
 return (
  <section className='p-4 mx-auto w-[min(100%,80rem)]'>
   <AccessProvider formTitle='servicesList'>
    <ServicesWrapper />
   </AccessProvider>
  </section>
 );
}
