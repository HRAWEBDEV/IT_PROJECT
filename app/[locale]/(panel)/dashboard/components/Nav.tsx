'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useNavigationContext } from '../navigation/navigationContext';
import { useAppConfig } from '@/services/app-config/appConfig';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
// import Link from 'next/link';

// const iconsStyle = { fontSize: '2rem' };

const getNavItemIcon = (key: string) => {
 switch (key) {
  case 'settings':
   return <SettingsOutlinedIcon fontSize='large' />;
  case 'initInfo':
   return <MapsHomeWorkOutlinedIcon fontSize='large' />;
  case 'services':
   return <ElectricalServicesOutlinedIcon fontSize='large' />;
  case 'projects':
   return <LanOutlinedIcon fontSize='large' />;
  case 'newsAndArticles':
   return <DescriptionOutlinedIcon fontSize='large' />;
  default:
   return null;
 }
};

export default function Nav() {
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
    {Object.entries(dic.navigation).map(([key, value]) => (
     <MenuItem
      key={key}
      sx={{
       padding: 0,
      }}
     >
      <Link
       href='#'
       className='w-full flex items-center gap-2 p-4 border-b border-neutral-300 dark:border-neutral-700'
      >
       <div className='text-neutral-500'>{getNavItemIcon(key)}</div>
       <span>{value as string}</span>
      </Link>
     </MenuItem>
    ))}
   </ul>
  </nav>
 );
}
