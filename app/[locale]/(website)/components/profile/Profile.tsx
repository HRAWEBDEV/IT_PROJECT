import Link from 'next/link';
import Menu from '@mui/material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useAuth } from '@/services/auth/authContext';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import { type Dic, type WithDictionary } from '@/localization/locales';
import { useRouter } from 'next/navigation';

type Props = {
 isOpen: boolean;
 profileAnchor: HTMLButtonElement | null;
 onClose: () => void;
} & WithDictionary;

export default function Profile({
 profileAnchor,
 onClose,
 isOpen,
 dic,
}: Props) {
 const { userInfo } = useAuthCheck();
 const router = useRouter();
 const { removeAuthToken } = useAuth();
 const { isLargeDevice } = useAppMonitorConfig();

 const profileList = [
  <MenuItem key={'profile'}>
   <Link href={'/profile/user-info'} className='w-full flex gap-3'>
    <AssignmentIndIcon color='primary' />
    <span>{userInfo?.User.personFullName}</span>
   </Link>
  </MenuItem>,
  <Divider key={'main-divider'} />,
  userInfo?.HasDashboard ? (
   <MenuItem key={'dashboard'}>
    <Link href={'/dashboard'} className='w-full flex gap-3'>
     <DashboardIcon color='secondary' />
     <span>{(dic.profile as Dic).dashboard as string}</span>
    </Link>
    ,
   </MenuItem>
  ) : null,
  <MenuItem key={'fav'}>
   <Link href={'/profile/favorites'} className='w-full flex gap-3'>
    <FavoriteIcon color='error' />
    <span>{(dic.profile as Dic).favorite as string}</span>
   </Link>
  </MenuItem>,
  <MenuItem
   key={'exit'}
   onClick={() => {
    removeAuthToken();
    onClose();
    router.push('/');
   }}
  >
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
