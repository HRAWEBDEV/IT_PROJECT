'use client';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useNavigationContext } from '../navigation/navigationContext';
import SettingsIcon from '@mui/icons-material/Settings';
import HandymanIcon from '@mui/icons-material/Handyman';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Link from 'next/link';

const iconsStyle = { fontSize: '2rem' };

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
   className={`fixed transition-transform ${navPosition} top-[--dashboard-header-height] lg:static bottom-0 w-[--dashboard-nav-width] bg-background shadow-lg border-e border-neutral-300 dark:border-neutral-700`}
  >
   <ul>
    <li>
     <Link
      href='/dashboard/settings'
      className='flex transition-colors items-center gap-4 p-4 min-h-[4.5rem] text-base font-medium border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
     >
      <div>
       <SettingsIcon sx={iconsStyle} />
      </div>
      <span>تنظیمات</span>
     </Link>
    </li>
    <li>
     <Link
      href='/dashboard/services'
      className='flex transition-colors items-center gap-4 p-4 min-h-[4.5rem] text-base font-medium border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
     >
      <div>
       <HandymanIcon sx={iconsStyle} />
      </div>
      <span>خدمات</span>
     </Link>
    </li>
    <li>
     <Link
      href='/dashboard/projects'
      className='flex transition-colors items-center gap-4 p-4 min-h-[4.5rem] text-base font-medium border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
     >
      <div>
       <HandymanIcon sx={iconsStyle} />
      </div>
      <span>پروژ‌هـــا</span>
     </Link>
    </li>
    <li>
     <Link
      href='/dashboard/articles'
      className='flex transition-colors items-center gap-4 p-4 min-h-[4.5rem] text-base font-medium border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
     >
      <div>
       <NewspaperIcon sx={iconsStyle} />
      </div>
      <span>اخبار و مقــاله‌ها</span>
     </Link>
    </li>
   </ul>
  </nav>
 );
}
