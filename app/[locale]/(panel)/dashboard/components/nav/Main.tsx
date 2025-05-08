'use client';
import { useNavigationContext } from '@/app/[locale]/(website)/services/NavigationContext';
import { PropsWithChildren } from 'react';
import { Backdrop } from '@mui/material';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';

export default function Main({ children }: PropsWithChildren) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { navIsVisible, setNavIsVisible } = useNavigationContext();
 return (
  <div
   className={`flex-grow bg-neutral-100 dark:bg-neutral-900 ${
    navIsVisible ? 'overflow-hidden' : 'overflow-auto'
   } lg:overflow-auto`}
  >
   {children}
   <Backdrop
    onClick={() => setNavIsVisible(false)}
    sx={{
     top: ' var(--dashboard-header-height)',
    }}
    open={navIsVisible && !isLargeDevice}
   />
  </div>
 );
}
