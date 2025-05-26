import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { type Dic } from '@/localization/locales';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { useAuth } from '@/services/auth/authContext';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import { useRouter } from 'next/navigation';

type Props = {
 isOpen: boolean;
 profileAnchor: HTMLButtonElement | null;
 onClose: () => void;
};

export default function Profile({ profileAnchor, onClose, isOpen }: Props) {
 const router = useRouter();
 const { userInfo } = useAuthCheck();
 const { removeAuthToken } = useAuth();
 const { isLargeDevice } = useAppMonitorConfig();
 const { profile } = useWebsiteDictionary() as {
  profile: Dic;
 };

 const profileList = [
  <MenuItem key={'user-name'} onClick={onClose}>
   <div className='flex gap-3'>
    <PersonIcon color='primary' />
    <span>{userInfo?.User.personFullName}</span>
   </div>
  </MenuItem>,
  <Divider key={'divider'} />,
  <MenuItem key={'website'}>
   <Link href={'/'} className='w-full'>
    <div className='flex gap-3'>
     <WebAssetIcon color='primary' />
     <span>{profile.returnToWebsite as string}</span>
    </div>
   </Link>
  </MenuItem>,
  <MenuItem
   key={'exit'}
   onClick={() => {
    removeAuthToken();
    router.push('/');
    onClose();
   }}
  >
   <div className='flex gap-3'>
    <LogoutIcon color='warning' />
    <span>{profile.exit as string}</span>
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
