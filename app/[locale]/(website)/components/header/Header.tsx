'use client';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

export default function Header() {
 return (
  <header className='fixed top-0 start-0 end-0 bg-neutral-200 z-[--header-zindex] shadow-[0px_0px_10px_3px] shadow-neutral-400/60 h-[--header-height] flex'>
   <div className='container flex-grow flex items-center'>
    <div className='basis-0 flex-grow'>
     <IconButton
      color='primary'
      sx={{
       backgroundColor: (theme) => alpha(theme.palette.sky['200'], 0.6),
      }}
     >
      <DehazeIcon />
     </IconButton>
    </div>
    <div>
     <div className='text-xl text-primary font-bold'>LOGO</div>
    </div>
    <div className='basis-0 flex-grow flex justify-end'>
     <IconButton
      color='primary'
      sx={{
       backgroundColor: (theme) => alpha(theme.palette.sky['200'], 0.6),
      }}
     >
      <PersonIcon />
     </IconButton>
    </div>
   </div>
  </header>
 );
}
