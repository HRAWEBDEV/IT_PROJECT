'use client';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigationContext } from '../../services/NavigationContext';
import { addClass } from '@/utils/addClass';

export default function Header() {
 const { headerIsVisible } = useNavigationContext();
 return (
  <header
   className={`fixed top-0 start-0 end-0 bg-neutral-100 z-[--header-zindex] shadow-[0px_0px_10px_3px] shadow-neutral-400/60 h-[--header-height] flex ${addClass(
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
     <IconButton color='primary'>
      <WbSunnyOutlinedIcon />
     </IconButton>
     <IconButton color='primary'>
      <PersonIcon />
     </IconButton>
    </div>
   </div>
  </header>
 );
}
