'use client';
import { useState } from 'react';
import { useAppConfig } from '@/services/app-config/appConfig';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Badge from '@mui/material/Badge';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LanguageIcon from '@mui/icons-material/Language';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import Profile from './profile/Profile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Language from '@/app/[locale]/(website)/components/language/Language';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigationContext } from '@/app/[locale]/(website)/services/NavigationContext';

export default function Header() {
 const { navIsVisible, setNavIsVisible } = useNavigationContext();
 const { mode, changeMode, localeInfo } = useAppConfig();
 const { isLargeDevice } = useAppMonitorConfig();
 const { isQueryTrue: isProfileOpen, handleToggle: handleToggleProfile } =
  useQueryToggler('show-profile');
 const { isQueryTrue: isLanguageOpen, handleToggle: handleToggleLanguage } =
  useQueryToggler('show-language');
 const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
  null
 );
 const [languageAnchor, setLanguageAnchor] = useState<HTMLButtonElement | null>(
  null
 );
 return (
  <header className='h-[--dashboard-header-height] border-b border-neutral-300 dark:border-neutral-700 flex justify-between flex-shrink-0'>
   <div className='flex items-center lg:items-stretch'>
    <div className='mx-2 lg:hidden'>
     <IconButton
      color='primary'
      size='large'
      onClick={() => setNavIsVisible((pre) => !pre)}
     >
      {navIsVisible ? (
       <CloseIcon fontSize='large' color='error' />
      ) : (
       <DehazeIcon fontSize='large' />
      )}
     </IconButton>
    </div>
    <div className='lg:w-[--dashboard-nav-width] lg:flex lg:items-center lg:justify-center lg:border-e border-neutral-300 dark:border-neutral-700'>
     <span className='font-medium text-xl'>LOGO</span>
    </div>
   </div>
   <div className='flex'>
    <div className='flex items-center'>
     <IconButton
      size={isLargeDevice ? 'large' : 'medium'}
      color={mode === 'dark' ? 'primary' : 'warning'}
      onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
     >
      {mode === 'dark' ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
     </IconButton>
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
    </div>
    <div className='lg:border-s lg:border-neutral-300 dark:lg:border-neutral-700 lg:ms-4'>
     <Button
      className='flex h-full'
      onClick={(e) => {
       setProfileAnchor(e.currentTarget);
       handleToggleProfile();
      }}
     >
      <div className='flex items-center'>
       <ArrowDropDownIcon />
       <span className='pe-2 hidden lg:inline-block'>امیررضا حسینی</span>
       <AccountCircleIcon fontSize='large' />
      </div>
     </Button>
    </div>
   </div>
   <Language
    isOpen={isLanguageOpen && Boolean(languageAnchor)}
    profileAnchor={languageAnchor}
    onClose={() => {
     setLanguageAnchor(null);
     handleToggleLanguage();
    }}
   />
   <Profile
    isOpen={isProfileOpen && Boolean(profileAnchor)}
    profileAnchor={profileAnchor}
    onClose={() => {
     setProfileAnchor(null);
     handleToggleProfile();
    }}
   />
  </header>
 );
}
