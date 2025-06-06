'use client';
import { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { useAuth } from '@/services/auth/authContext';
import { useRouter } from 'next/navigation';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function DashboardWrapper({ children }: PropsWithChildren) {
 const { isLogedIn } = useAuth();
 const { userInfo, isFetchingUser } = useAuthCheck();
 const router = useRouter();
 useEffect(() => {
  if (!isLogedIn || (userInfo && !userInfo.HasDashboard)) {
   router.push('/');
  }
 }, [isLogedIn, router, userInfo]);

 return (
  <div>
   {isFetchingUser ? (
    <div className='p-4 h-[100vh] flex justify-center items-center'>
     <CircularProgress />
    </div>
   ) : (
    children
   )}
  </div>
 );
}
