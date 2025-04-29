'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useNavigationContext } from '../navigation/navigationContext';
import { useAppConfig } from '@/services/app-config/appConfig';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
// import Link from 'next/link';

// const iconsStyle = { fontSize: '2rem' };

const getNavItemInfo = (
 key: string
): {
 href: string;
 icon: ReactNode;
} => {
 switch (key) {
  case 'settings':
   return {
    href: '/dashboard/settings',
    icon: <SettingsOutlinedIcon fontSize='large' />,
   };

  case 'initInfo':
   return {
    href: '/dashboard/init-info',
    icon: <MapsHomeWorkOutlinedIcon fontSize='large' />,
   };
  case 'services':
   return {
    href: '/dashboard/services',
    icon: <ElectricalServicesOutlinedIcon fontSize='large' />,
   };
  case 'projects':
   return {
    href: '/dashboard/projects',
    icon: <LanOutlinedIcon fontSize='large' />,
   };
  case 'newsAndArticles':
   return {
    href: '/dashboard/news-and-articles',
    icon: <DescriptionOutlinedIcon fontSize='large' />,
   };
 }
 return {
  href: '',
  icon: null,
 };
};

export default function Nav() {
 const pathname = usePathname();
 const lastSection = pathname.split('/').at(-1);
 const { isNavigationVisible } = useNavigationContext();
 const { isLargeDevice } = useAppMonitorConfig();
 const { localeInfo } = useAppConfig();
 const dic = useWebsiteDictionary() as {
  navigation: Dic;
 };

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
  >
   <ul>
    {Object.entries(dic.navigation).map(([key, value]) => {
     const { href, icon } = getNavItemInfo(key);
     return (
      <MenuItem
       key={key}
       sx={{
        padding: 0,
       }}
      >
       <Link
        aria-selected={lastSection === key}
        href={href}
        className='group aria-selected:bg-sky-100 aria-selected:dark:bg-sky-900 w-full flex items-center gap-2 p-4 border-b border-neutral-300 dark:border-neutral-700'
       >
        <div className='text-neutral-500 group-aria-selected:text-primary'>
         {icon}
        </div>
        <span>{value as string}</span>
       </Link>
      </MenuItem>
     );
    })}
   </ul>
  </nav>
 );
}
