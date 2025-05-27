import AccessProvider from '../services/access/AccessProvider';
import Company from './components/company/Company';
import Socials from './components/socials/Socials';

export default function page() {
 return (
  <AccessProvider formTitle='initialInfo'>
   <div className='w-[min(100%,50rem)] mx-auto p-4'>
    <Company />
    <Socials />
   </div>
  </AccessProvider>
 );
}
