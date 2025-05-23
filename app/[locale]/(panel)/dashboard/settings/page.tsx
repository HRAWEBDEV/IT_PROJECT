import AccessProvider from '@/app/[locale]/(panel)/dashboard/services/access/AccessProvider';
import UsersWrapper from './components/users/UsersWrapper';
import ContactUsWrapper from './components/contact-us/ContactUsWrapper';

export default function page() {
 return (
  <div className='p-4 mx-auto'>
   <AccessProvider formTitle='settings'>
    <UsersWrapper />
   </AccessProvider>
   <ContactUsWrapper />
  </div>
 );
}
