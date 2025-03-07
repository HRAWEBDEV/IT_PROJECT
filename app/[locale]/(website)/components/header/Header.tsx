'use client';
import Link from 'next/link';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useNavigationContext } from '../../services/NavigationContext';
import { addClass } from '@/utils/addClass';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '../Search/Search';
import Profile from '../profile/Profile';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useState } from 'react';

export default function Header() {
 const { isQueryTrue: isProfileOpen, handleToggle: handleToggleProfile } =
  useQueryToggler('show-profile');
 const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
  null
 );
 const { isQueryTrue: isSearchOpen, handleToggle: handleToggleSearch } =
  useQueryToggler('show-search');
 const { isLargeDevice } = useAppMonitorConfig();
 const { headerIsVisible } = useNavigationContext();
 const { mode, changeMode } = useAppConfig();
 return (
  <header
   className={`fixed top-0 start-0 end-0 bg-neutral-100 dark:bg-neutral-900 z-[--header-zindex] shadow-[0px_0px_10px_3px] shadow-neutral-400/60 dark:shadow-neutral-700/60 h-[--header-height] flex ${addClass(
    !headerIsVisible,
    '-translate-y-[--header-height]'
   )} transition-transform`}
  >
   <div className='container flex-grow flex items-center'>
    <div className='lg:hidden basis-0 flex-grow flex gap-2 lg:flex-grow-0'>
     <IconButton color='primary' LinkComponent={Link} href='/menu'>
      <DehazeIcon />
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
       className='transition-colors flex items-center p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex'>
        <span>خـــانه</span>
       </div>
      </Link>
     </li>
     <li className='flex'>
      <Link
       href={'#'}
       className='transition-colors flex items-center p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex'>
        <span>خدمـــات</span>
        <ArrowDropDownIcon />
       </div>
      </Link>
     </li>
     <li className='flex'>
      <Link
       href={'/projects'}
       className='transition-colors flex items-center p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>پروژه‌ها</span>
        <ArrowDropDownIcon />
       </div>
      </Link>
     </li>
     <li className='flex'>
      <Link
       href={'/articles'}
       className='transition-colors flex items-center p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>اخبار و مقـــاله‌ها</span>
       </div>
      </Link>
     </li>
     <li className='flex'>
      <Link
       href={'/about-us'}
       className='transition-colors flex items-center p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>تماس با مــــا</span>
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
       placeholder='جستجو....'
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
      size={isLargeDevice ? 'large' : 'medium'}
      color={mode === 'dark' ? 'primary' : 'warning'}
      onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
     >
      {mode === 'dark' ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
     </IconButton>
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
    </div>
   </div>
   <Search isOpen={isSearchOpen} onClose={() => handleToggleSearch()} />
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
