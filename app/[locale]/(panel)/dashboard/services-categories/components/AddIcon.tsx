import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';

type Props = {
 open: boolean;
 setIcon: (icon: string) => void;
 onClose: () => void;
};
const iconClasses = [
 'icon-home',
 'icon-newspaper',
 'icon-blog',
 'icon-camera',
 'icon-play',
 'icon-film',
 'icon-video-camera',
 'icon-connection',
 'icon-podcast',
 'icon-mic',
 'icon-file-video',
 'icon-file-zip',
 'icon-folder-open',
 'icon-folder-download',
 'icon-ticket',
 'icon-credit-card',
 'icon-phone',
 'icon-envelop',
 'icon-location',
 'icon-map',
 'icon-clock2',
 'icon-calendar',
 'icon-keyboard',
 'icon-laptop',
 'icon-printer',
 'icon-tv',
 'icon-download',
 'icon-floppy-disk',
 'icon-database',
 'icon-drive',
 'icon-bubbles2',
 'icon-users',
 'icon-hour-glass',
 'icon-lock',
 'icon-key',
 'icon-cogs',
];

export default function AddIcon({ open, onClose, setIcon }: Props) {
 const { servicesCategories } = useWebsiteDictionary() as {
  servicesCategories: Dic;
 };
 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='sm'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>
      {servicesCategories.addIcon as string}
     </span>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(5rem,1fr))]'>
     {iconClasses.map((icon) => (
      <Button
       variant='outlined'
       key={icon}
       className='!text-neutral-500 dark:!text-neutral-400 h-[5rem] hover:!text-neutral-700 dark:hover:!text-neutral-300'
       onClick={() => {
        setIcon(icon);
        onClose();
       }}
      >
       <i className={`${icon} text-[3.5rem]`}></i>
      </Button>
     ))}
    </div>
   </DialogContent>
  </Dialog>
 );
}
