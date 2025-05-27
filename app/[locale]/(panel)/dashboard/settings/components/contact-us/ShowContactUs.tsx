import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { type ContactUs } from '@/services/api-actions/globalApiActions';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
 open: boolean;
 onClose: () => void;
 contactUs: ContactUs;
};

export default function ShowContactUs({ open, onClose, contactUs }: Props) {
 const { initialInfo } = useWebsiteDictionary() as {
  initialInfo: Dic;
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
     <div className='flex items-center'>
      {contactUs.isRead && (
       <div className='me-4'>
        <CheckCircleIcon color='success' fontSize='large' />
       </div>
      )}
      <span className='text-base font-bold'>
       {initialInfo.showInfo as string}
      </span>
     </div>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='rounded-lg'>
     <div className='grid grid-cols-2 gap-4 mb-4'>
      <TextField
       name='firstName'
       value={contactUs.firstName}
       size='small'
       label={initialInfo.firstName as string}
       slotProps={{
        input: {
         readOnly: true,
        },
       }}
      />
      <TextField
       name='lastName'
       value={contactUs.lastName}
       size='small'
       label={initialInfo.lastName as string}
       slotProps={{
        input: {
         readOnly: true,
        },
       }}
      />
      <TextField
       name='cellPhone'
       value={contactUs.cellPhone}
       size='small'
       label={initialInfo.cellPhone as string}
       slotProps={{
        input: {
         readOnly: true,
        },
       }}
      />
      <TextField
       name='email'
       value={contactUs.email}
       size='small'
       label={initialInfo.email as string}
       slotProps={{
        input: {
         readOnly: true,
        },
       }}
      />
     </div>
     <TextField
      name='description'
      value={contactUs.description}
      fullWidth
      size='small'
      multiline
      rows={4}
      label={initialInfo.description as string}
      slotProps={{
       input: {
        readOnly: true,
       },
      }}
     />
    </div>
   </DialogContent>
  </Dialog>
 );
}
