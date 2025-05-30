import AccessProvider from '@/app/[locale]/(panel)/dashboard/services/access/AccessProvider';
import UsersWrapper from './components/users/UsersWrapper';

export default function page() {
 return (
  <div className='p-4 mx-auto'>
   <AccessProvider formTitle='users'>
    <UsersWrapper />
   </AccessProvider>
  </div>
 );
}
