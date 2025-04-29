'use client';
import Link from 'next/link';
import { useAppConfig } from '@/services/app-config/appConfig';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import Profile from './profile/Profile';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigationContext } from '../navigation/navigationContext';
import Language from '@/app/[locale]/(website)/components/language/Language';
import LanguageIcon from '@mui/icons-material/Language';

export default function Header() {
 const { isNavigationVisible, handleToggleNavigation } = useNavigationContext();
 const { isQueryTrue: isProfileOpen, handleToggle: handleToggleProfile } =
  useQueryToggler('show-profile');
 const { isQueryTrue: isLanguageOpen, handleToggle: handleToggleLanguage } =
  useQueryToggler('show-language');
 const [languageAnchor, setLanguageAnchor] = useState<HTMLButtonElement | null>(
  null
 );
 const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
  null
 );
 const { isLargeDevice } = useAppMonitorConfig();
 const { mode, changeMode, localeInfo } = useAppConfig();
 return (
  <header
   className={`backdrop-blur-sm bg-background shadow-[0px_0px_10px_3px] lg:shadow-none shadow-neutral-400/60 dark:shadow-neutral-700/60 h-[--dashboard-header-height] flex border-b border-neutral-300 dark:border-neutral-700`}
  >
   <div className='ps-6 lg:ps-0 flex-grow flex items-center'>
    <div className='flex items-center gap-4 lg:gap-6'>
     <div className='lg:hidden basis-0 flex gap-2 lg:flex-grow-0'>
      <IconButton color='primary' onClick={handleToggleNavigation}>
       {isNavigationVisible ? <CloseIcon /> : <DehazeIcon />}
      </IconButton>
     </div>
     <div className='flex justify-center items-center lg:w-[--dashboard-nav-width] h-[--dashboard-header-height] lg:border-e border-neutral-300 dark:border-neutral-700'>
      <Link href={'/'} className='text-xl text-primary font-bold'>
       LOGO
      </Link>
     </div>
    </div>
    <div
     className={`pe-6 basis-0 flex-grow flex justify-end gap-2  items-center self-stretch lg:shadow-[${
      localeInfo.dir === 'rtl' ? '-4px' : '4px'
     }_2px_4px_0px] lg:shadow-neutral-400/60 lg:dark:shadow-neutral-700/60`}
    >
     <IconButton
      color='success'
      size='large'
      onClick={(e) => {
       setLanguageAnchor(e.currentTarget);
       handleToggleLanguage();
      }}
     >
      <Badge badgeContent={localeInfo.short} color='success'>
       <LanguageIcon />
      </Badge>
     </IconButton>
     <IconButton
      size={isLargeDevice ? 'large' : 'medium'}
      color={mode === 'dark' ? 'primary' : 'warning'}
      onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
     >
      {mode === 'dark' ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
     </IconButton>
     <Button
      className='!border-s !border-solid !border-neutral-300 dark:!border-neutral-700 !rounded-none !ps-4'
      sx={{ padding: 0 }}
      color='secondary'
      onClick={(e) => {
       setProfileAnchor(e.currentTarget);
       handleToggleProfile();
      }}
     >
      <div className='flex gap-2 items-center'>
       <div className='font-medium text-foreground hidden lg:inline-block'>
        <ArrowDropDownIcon />
        <span className='hidden lg:inline-block'>حمیدرضا اکبری</span>
       </div>
       <span></span>
       <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }} />
      </div>
     </Button>
    </div>
   </div>
   <Profile
    isOpen={isProfileOpen && Boolean(profileAnchor)}
    profileAnchor={profileAnchor}
    onClose={() => {
     setProfileAnchor(null);
     handleToggleProfile();
    }}
   />
   <Language
    isOpen={isLanguageOpen && Boolean(languageAnchor)}
    profileAnchor={languageAnchor}
    onClose={() => {
     setLanguageAnchor(null);
     handleToggleLanguage();
    }}
   />
  </header>
 );
}
