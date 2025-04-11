'use client';
import Link from 'next/link';
import { useAppConfig } from '@/services/app-config/appConfig';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import Profile from './profile/Profile';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function Header() {
 const { isQueryTrue: isProfileOpen, handleToggle: handleToggleProfile } =
  useQueryToggler('show-profile');
 const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
  null
 );
 const { isLargeDevice } = useAppMonitorConfig();
 const { mode, changeMode } = useAppConfig();
 return (
  <header
   className={`fixed backdrop-blur-sm top-0 start-0 end-0 bg-background z-[--header-zindex] shadow-[0px_0px_10px_3px] shadow-neutral-400/60 dark:shadow-neutral-700/60 h-[--dashboard-header-height] flex px-6`}
  >
   <div className='flex-grow flex items-center'>
    <div className='flex items-center gap-6'>
     <div className='lg:hidden basis-0 flex gap-2 lg:flex-grow-0'>
      <IconButton color='primary' LinkComponent={Link} href='/menu'>
       <DehazeIcon />
      </IconButton>
     </div>
     <div>
      <Link href={'/'} className='text-xl text-primary font-bold'>
       LOGO
      </Link>
     </div>
    </div>
    <div className='basis-0 flex-grow flex justify-end gap-2  items-center self-stretch'>
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
       <div className='font-medium text-foreground'>
        <ArrowDropDownIcon />
        حمیدرضا اکبری
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
  </header>
 );
}
