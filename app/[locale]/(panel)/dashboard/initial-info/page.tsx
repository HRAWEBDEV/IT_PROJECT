import AccessProvider from '../services/access/AccessProvider';
import Company from './components/company/Company';

export default function page() {
 return (
  <AccessProvider formTitle='initialInfo'>
   <div className='w-[min(100%,50rem)] mx-auto p-4'>
    <Company />
   </div>
  </AccessProvider>
 );
}
