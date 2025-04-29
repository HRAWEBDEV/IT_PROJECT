import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useAppConfig } from '@/services/app-config/appConfig';
import { locales } from '@/localization/locales';
import { getLangFlag } from '@/utils/getLangFlag';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
 isOpen: boolean;
 profileAnchor: HTMLButtonElement | null;
 onClose: () => void;
};

export default function Language({ profileAnchor, onClose, isOpen }: Props) {
 const { locale, changeLocale } = useAppConfig();
 const { isLargeDevice } = useAppMonitorConfig();

 const profileList = Object.values(locales).map((val) => (
  <MenuItem
   key={val.langAlias}
   sx={{
    paddingBlock: '1rem',
   }}
   onClick={() => {
    onClose();
    if (val.langAlias === locale) return;
    setTimeout(() => {
     changeLocale(val.langAlias);
    }, 400);
   }}
  >
   <div aria-selected={val.langAlias === locale} className='w-full flex gap-3'>
    {getLangFlag(val.langAlias, { width: '2rem' })}
    <span
     className={`capitalize flex-grow ${
      val.langAlias === 'en' ? 'font-enRoboto' : 'font-irs'
     } `}
    >
     {val.long}
    </span>
    {val.langAlias === locale && <CheckIcon color='success' />}
   </div>
  </MenuItem>
 ));

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
     borderStartStartRadius: '1rem',
     borderStartEndRadius: '1rem',
     paddingTop: '1rem',
    },
   }}
   anchor='bottom'
   onClose={onClose}
   open={isOpen}
  >
   <div className='py-4'>{profileList}</div>
  </Drawer>
 );
}
