'use client';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useNavigationContext } from '../../services/NavigationContext';
import { addClass } from '@/utils/addClass';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';

export default function Header() {
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
    <div className='basis-0 flex-grow flex gap-2'>
     <IconButton color='primary'>
      <DehazeIcon />
     </IconButton>
     <IconButton color='primary'>
      <SearchOutlinedIcon />
     </IconButton>
    </div>
    <div>
     <div className='text-xl text-primary font-bold'>LOGO</div>
    </div>
    <div className='basis-0 flex-grow flex justify-end gap-2'>
     <IconButton
      color={mode === 'dark' ? 'primary' : 'warning'}
      onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
     >
      {mode === 'dark' ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
     </IconButton>
     <IconButton color='secondary'>
      <PersonIcon />
     </IconButton>
    </div>
   </div>
  </header>
 );
}
