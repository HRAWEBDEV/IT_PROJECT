import AccessProvider from '../services/access/AccessProvider';
import ContactUsWrapper from './components/contact-us/ContactUsWrapper';

export default function page() {
 return (
  <AccessProvider formTitle='contactUs'>
   <ContactUsWrapper />
  </AccessProvider>
 );
}
