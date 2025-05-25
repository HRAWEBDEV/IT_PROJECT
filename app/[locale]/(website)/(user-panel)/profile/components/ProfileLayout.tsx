'use client';
import Link from 'next/link';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useEffect } from 'react';
import ProfileMenu from './ProfileMenu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from '../../../components/footer/Footer';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/services/auth/authContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import { AppParams } from '@/utils/appParams';

export default function ProfileLayout({
 children,
 params,
}: {
 children: React.ReactNode;
 params: Promise<AppParams>;
}) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { userInfo, isFetchingUser } = useAuthCheck();
 const pathname = usePathname();
 const page = pathname.split('/').at(-1);
 const { isLogedIn } = useAuth();
 const router = useRouter();

 useEffect(() => {
  if (!isLogedIn) {
   router.push('/');
   return;
  }
 }, [isLogedIn, router, page]);

 return (
  <>
   {isFetchingUser || !userInfo ? (
    <div className='p-4 min-h-[35rem] flex justify-center items-center'>
     <CircularProgress />
    </div>
   ) : (
    <div className='container grid gap-4 lg:grid-cols-[16rem_1fr] min-h-[30rem]'>
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
   )}

   <Footer params={params} />
  </>
 );
}
