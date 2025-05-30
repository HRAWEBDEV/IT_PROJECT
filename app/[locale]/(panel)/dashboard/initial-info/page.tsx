import AccessProvider from '../services/access/AccessProvider';
import Company from './components/company/Company';
import Socials from './components/socials/Socials';

export default function page() {
 return (
  <div className='w-[min(100%,50rem)] mx-auto p-4'>
   <AccessProvider formTitle='initialInfo'>
    <Company />
   </AccessProvider>
   <AccessProvider formTitle='SocialMedia'>
    <Socials />
   </AccessProvider>
  </div>
 );
}
