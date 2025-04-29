import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { type Dic } from '@/localization/locales';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';

type Props = {
 isOpen: boolean;
 profileAnchor: HTMLButtonElement | null;
 onClose: () => void;
};

export default function Profile({ profileAnchor, onClose, isOpen }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const dic = useWebsiteDictionary();

 const profileList = [
  <MenuItem key={'fav'}>
   <Link href={'/'} className='w-full flex gap-3'>
    <HomeIcon color='primary' />
    <span>{(dic.profile as Dic).returnToSite as string}</span>
   </Link>
  </MenuItem>,
  <Divider key={'divider'} />,
  <MenuItem key={'exit'}>
   <div className='flex gap-3'>
    <LogoutIcon color='warning' />
    <span>{(dic.profile as Dic).exit as string}</span>
   </div>
  </MenuItem>,
 ];

 return isLargeDevice ? (
  <Menu
   onClose={onClose}
   open={isOpen}
   anchorEl={profileAnchor}
   transformOrigin={{
    horizontal: 'left',
    vertical: 'top',
   }}
   sx={{
    '& .MuiButtonBase-root': {
     fontSize: 'inherit',
    },
    '& .MuiPaper-root': {
     minWidth: '12rem',
    },
   }}
   anchorOrigin={{
    horizontal: 'left',
    vertical: 'bottom',
   }}
  >
   {profileList}
  </Menu>
 ) : (
  <Drawer
   sx={{
    '& .MuiButtonBase-root': {
     fontSize: 'inherit',
    },
    '& .MuiPaper-root': {
     minWidth: '15rem',
    },
   }}
   anchor='right'
   onClose={onClose}
   open={isOpen}
  >
   <div className='py-4'>{profileList}</div>
  </Drawer>
 );
}
