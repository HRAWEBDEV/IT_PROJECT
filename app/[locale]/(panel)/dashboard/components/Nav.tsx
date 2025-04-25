'use client';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useNavigationContext } from '../navigation/navigationContext';

export default function Nav() {
 const { isNavigationVisible } = useNavigationContext();
 const { isLargeDevice } = useAppMonitorConfig();

 let navPosition = isLargeDevice
  ? 'translate-x-0'
  : 'translate-x-[var(--dashboard-nav-width)]';

 if (!isLargeDevice && isNavigationVisible) {
  navPosition = 'translate-x-0';
 }

 return (
  <nav
   className={`fixed transition-transform ${navPosition} top-[--dashboard-header-height] lg:block bottom-0 w-[--dashboard-nav-width] bg-background shadow-lg border-e border-neutral-300 dark:border-neutral-700`}
  >
   test
  </nav>
 );
}
