import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';

type Props = {
 message: string;
 open: boolean;
 onConfirm: () => void;
 onCancel: () => void;
};

export default function ConfirmBox({
 message,
 onConfirm,
 onCancel,
 open,
}: Props) {
 const dic = useWebsiteDictionary();
 return (
  <Dialog open={open} onClose={onCancel} fullWidth maxWidth='sm'>
   <DialogTitle>
    <WarningAmberIcon color='warning' fontSize='large' />
   </DialogTitle>
   <DialogContent dividers>
    <div className='py-4'>
     <span className='font-medium ms-4'>{message}</span>
    </div>
   </DialogContent>
   <DialogActions>
    <Button
     className='w-[7rem]'
     onClick={onCancel}
     variant='outlined'
     color='error'
    >
     {dic.cancel as string}
    </Button>
    <Button className='w-[7rem]' onClick={onConfirm} variant='contained'>
     {dic.confirm as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
