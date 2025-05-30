import AccessProvider from '../services/access/AccessProvider';
import ContactUsWrapper from './components/contact-us/ContactUsWrapper';

export default function page() {
 return (
  <div className='p-4 mx-auto'>
   <AccessProvider formTitle='contactUs'>
    <ContactUsWrapper />
   </AccessProvider>
  </div>
 );
}
