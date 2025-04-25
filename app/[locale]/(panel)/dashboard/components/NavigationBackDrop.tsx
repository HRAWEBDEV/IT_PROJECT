'use client';
import Backdrop from '@mui/material/Backdrop';
import { useNavigationContext } from '../navigation/navigationContext';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';

export default function NavigationBackDrop() {
 const { isLargeDevice } = useAppMonitorConfig();
 const { isNavigationVisible } = useNavigationContext();
 return (
  <Backdrop
   open={!isLargeDevice && isNavigationVisible}
   sx={{ top: 'var(--dashboard-header-height)' }}
  />
 );
}
