'use client';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useNavigationContext } from '../navigation/navigationContext';
import { useAppConfig } from '@/services/app-config/appConfig';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
// import Link from 'next/link';

// const iconsStyle = { fontSize: '2rem' };

export default function Nav() {
 const { isNavigationVisible } = useNavigationContext();
 const { isLargeDevice } = useAppMonitorConfig();
 const { localeInfo } = useAppConfig();

 let navPosition = isLargeDevice
  ? 'translate-x-0'
  : localeInfo.dir === 'rtl'
  ? 'translate-x-[var(--dashboard-nav-width)]'
  : '-translate-x-[var(--dashboard-nav-width)]';

 if (!isLargeDevice && isNavigationVisible) {
  navPosition = 'translate-x-0';
 }

 return (
  <nav
   className={`fixed transition-transform ${navPosition} top-[--dashboard-header-height] lg:static bottom-0 w-[--dashboard-nav-width] bg-background shadow-lg border-e border-neutral-300 dark:border-neutral-700`}
  ></nav>
 );
}
