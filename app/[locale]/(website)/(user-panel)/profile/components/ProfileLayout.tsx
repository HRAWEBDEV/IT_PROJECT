'use client';
import Link from 'next/link';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { PropsWithChildren } from 'react';
import ProfileMenu from './ProfileMenu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from '../../../components/footer/Footer';
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';

export default function ProfileLayout({ children }: PropsWithChildren) {
 const { isLargeDevice } = useAppMonitorConfig();
 const pathname = usePathname();
 const router = useRouter();
 const page = pathname.split('/').at(-1);

 if (isLargeDevice && page === 'profile') {
  router.push('/profile/favorites');
 }

 return (
  <>
   <div className='container grid gap-4 lg:grid-cols-[16rem_1fr]'>
    {isLargeDevice && <ProfileMenu />}
    <div className='overflow-hidden'>
     <div className='p-4'>
      {!isLargeDevice && page !== 'profile' && (
       <Button color='error' LinkComponent={Link} href='/profile'>
        <div className='flex gap-2 items-center'>
         <ArrowForwardIcon />
         <span>بازگشت</span>
        </div>
       </Button>
      )}
     </div>
     {children}
    </div>
   </div>
   <Footer />
  </>
 );
}
