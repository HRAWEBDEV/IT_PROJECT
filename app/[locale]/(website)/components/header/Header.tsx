'use client';
import Link from 'next/link';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useNavigationContext } from '../../services/NavigationContext';
import { addClass } from '@/utils/addClass';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

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
    <div className='lg:hidden basis-0 flex-grow flex gap-2 lg:flex-grow-0'>
     <IconButton color='primary' LinkComponent={Link} href='/menu'>
      <DehazeIcon />
     </IconButton>
     <IconButton color='primary'>
      <SearchOutlinedIcon />
     </IconButton>
    </div>
    <div>
     <div className='text-xl text-primary font-bold'>LOGO</div>
    </div>
    <menu className='hidden lg:flex lg:flex-grow ms-20 me-10'>
     <li>
      <Link
       href={'#'}
       className='transition-colors block p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>خدمـــات</span>
        <ArrowDropDownIcon />
       </div>
      </Link>
     </li>
     <li>
      <Link
       href={'#'}
       className='transition-colors block p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>پروژه‌ها</span>
        <ArrowDropDownIcon />
       </div>
      </Link>
     </li>
     <li>
      <Link
       href={'#'}
       className='transition-colors block p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>اخبار و مقـــالات</span>
       </div>
      </Link>
     </li>
     <li>
      <Link
       href={'#'}
       className='transition-colors block p-4 text-base font-medium hover:text-secondary focus:text-secondary'
      >
       <div className='flex gap-1'>
        <span>درباره مــا</span>
       </div>
      </Link>
     </li>
    </menu>
    <div className='basis-0 flex-grow flex justify-end gap-2 lg:flex-grow-0 lg:gap-4 items-center'>
     <div className='hidden lg:flex'>
      <TextField
       className='transition-[width_0.3s_ease] w-[13rem] [&_::placeholder]:text-[0.9rem]'
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
