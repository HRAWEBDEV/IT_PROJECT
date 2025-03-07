import Menu from '@mui/material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';

type Props = {
 isOpen: boolean;
 profileAnchor: HTMLButtonElement | null;
 onClose: () => void;
};

export default function Profile({ profileAnchor, onClose, isOpen }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();

 const profileList = [
  <MenuItem key={'fav'}>
   <div className='flex gap-3'>
    <FavoriteIcon color='error' />
    <span>علاقه مندی‌ها</span>
   </div>
  </MenuItem>,

  <Divider key={'divider'} />,
  <MenuItem key={'exit'}>
   <div className='flex gap-3'>
    <LogoutIcon color='warning' />
    <span>خروج</span>
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
