import AccessProvider from '../services/access/AccessProvider';
import AboutUsWrapper from './components/AboutUsWrapper';

export default function page() {
 return (
  <div className='p-4 mx-auto'>
   <AccessProvider formTitle='aboutUs'>
    <AboutUsWrapper />
   </AccessProvider>
  </div>
 );
}
