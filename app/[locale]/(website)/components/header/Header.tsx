'use client';
import { useAuth } from '@/services/auth/authContext';
import Link from 'next/link';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useNavigationContext } from '../../services/NavigationContext';
import { addClass } from '@/utils/addClass';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import InputAdornment from '@mui/material/InputAdornment';
import LoginIcon from '@mui/icons-material/Login';
import Search from '../Search/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Profile from '../profile/Profile';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useState } from 'react';
import Options from './Options';
import Services from './Services';
import Projects from './Projects';
import Language from '../language/Language';
import { type Dic, type WithDictionary } from '@/localization/locales';
import { Tooltip } from '@mui/material';

export default function Header({ dic }: WithDictionary) {
 const { isLogedIn } = useAuth();
 const [showServiceOptions, setShowServiceOptions] = useState(false);
 const [showProjectOptions, setShowProjectOptions] = useState(false);
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
 const { isQueryTrue: isSearchOpen, handleToggle: handleToggleSearch } =
  useQueryToggler('show-search');
 const { isLargeDevice } = useAppMonitorConfig();
 const { headerIsVisible } = useNavigationContext();
 const { mode, changeMode, localeInfo } = useAppConfig();
 return (
  <header
   className={`fixed backdrop-blur-sm top-0 start-0 end-0 bg-neutral-100/80 dark:bg-neutral-900/80 z-[--header-zindex] shadow-[0px_0px_10px_3px] shadow-neutral-400/60 dark:shadow-neutral-700/60 h-[--header-height] flex ${addClass(
    !headerIsVisible,
    '-translate-y-[--header-height]'
   )} transition-transform`}
  >
   <div className='container flex-grow flex items-center'>
    <div className='lg:hidden basis-0 flex-grow flex gap-2 lg:flex-grow-0'>
     <IconButton
      color='success'
      size='large'
      className='!flex !-me-2 lg:!hidden'
      onClick={(e) => {
       setLanguageAnchor(e.currentTarget);
       handleToggleLanguage();
      }}
     >
      <Badge badgeContent={localeInfo.short} color='success'>
       <LanguageIcon />
      </Badge>
     </IconButton>
     <IconButton color='primary' onClick={() => handleToggleSearch()}>
      <SearchOutlinedIcon />
     </IconButton>
    </div>
    <div>
     <Link href={'/'} className='text-xl text-primary font-bold'>
      LOGO
     </Link>
    </div>
    <menu className='hidden lg:flex lg:flex-grow ms-5 me-10 lg:self-stretch'>
     <li className='flex'>
      <Link
       href={'/'}
       className='transition-colors flex items-center p-4 px-3 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex'>
        <span>{(dic.navigation as Dic).home as string}</span>
       </div>
      </Link>
     </li>
     <li className='flex'>
      <div
       tabIndex={0}
       role='button'
       className='relative transition-colors flex items-center p-4 px-3 text-base font-medium hover:text-secondary focus:text-secondary'
       onMouseEnter={() => setShowServiceOptions(true)}
       onFocus={() => setShowServiceOptions(true)}
       onMouseLeave={() => setShowServiceOptions(false)}
       onBlur={() => setShowServiceOptions(false)}
      >
       <div className='flex'>
        <span>{(dic.navigation as Dic).services as string}</span>
        <ArrowDropDownIcon />
       </div>
       <Options isOpen={showServiceOptions}>
        <Services dic={dic} onClose={() => setShowServiceOptions(false)} />
       </Options>
      </div>
     </li>
     <li className='flex'>
      <div
       role='button'
       tabIndex={0}
       className='relative transition-colors flex items-center p-4 px-3 text-base font-medium hover:text-secondary focus:text-secondary'
       onMouseEnter={() => setShowProjectOptions(true)}
       onFocus={() => setShowProjectOptions(true)}
       onMouseLeave={() => setShowProjectOptions(false)}
       onBlur={() => setShowProjectOptions(false)}
      >
       <div className='flex gap-1'>
        <span>{(dic.navigation as Dic).projects as string}</span>
        <ArrowDropDownIcon />
       </div>
       <Options isOpen={showProjectOptions}>
        <Projects dic={dic} onClose={() => setShowProjectOptions(false)} />
       </Options>
      </div>
     </li>
     <li className='flex'>
      <Link
       href={'/articles'}
       className='transition-colors flex items-center p-4 px-3 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>{(dic.navigation as Dic).articles as string}</span>
       </div>
      </Link>
     </li>
     <li className='flex'>
      <Link
       href={'/about-us'}
       className='transition-colors flex items-center p-4 px-3 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>{(dic.navigation as Dic).contact as string}</span>
       </div>
      </Link>
     </li>
    </menu>
    <div className='basis-0 flex-grow flex justify-end gap-2 lg:flex-grow-0 items-center self-stretch'>
     <div className='relative hidden lg:flex self-stretch items-center'>
      <TextField
       className='transition-[width_0.3s_ease] w-[13rem] [&_::placeholder]:text-[0.9rem]'
       onClick={() => handleToggleSearch()}
       size='small'
       placeholder={dic.navigation.search as string}
       sx={{
        '& .MuiInputBase-root': {
         backgroundColor: (theme) =>
          theme.palette.mode === 'light'
           ? theme.palette.neutral[200]
           : theme.palette.neutral[800],
         borderRadius: '4rem',
        },
       }}
       slotProps={{
        input: {
         readOnly: true,
         endAdornment: (
          <InputAdornment position='end' className='-me-2'>
           <SearchOutlinedIcon color='primary' />
          </InputAdornment>
         ),
        },
       }}
      />
     </div>
     <IconButton
      color='success'
      size='large'
      className='!hidden !-me-2 lg:!flex'
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
     {isLogedIn ? (
      <IconButton
       sx={{ padding: 0 }}
       color='secondary'
       onClick={(e) => {
        setProfileAnchor(e.currentTarget);
        handleToggleProfile();
       }}
      >
       <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }} />
      </IconButton>
     ) : (
      <Tooltip title={(dic.navigation as Dic).login as string}>
       <IconButton
        LinkComponent={Link}
        href='/auth'
        color='secondary'
        className='!bg-secondary-dark !text-secondary-foreground'
       >
        <LoginIcon />
       </IconButton>
      </Tooltip>
     )}
    </div>
   </div>
   <Search
    dic={dic}
    isOpen={isSearchOpen}
    onClose={() => handleToggleSearch()}
   />
   <Profile
    dic={dic}
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
