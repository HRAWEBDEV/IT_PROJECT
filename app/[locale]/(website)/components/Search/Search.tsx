import { FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';

type Props = {
 onClose: () => void;
};

export default function Search({ onClose }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 return (
  <Dialog
   sx={{
    '& .MuiDialogContent-root': {
     padding: 0,
    },
   }}
   open
   fullWidth
   fullScreen={!isLargeDevice}
   maxWidth='sm'
   scroll='paper'
   onClose={onClose}
   slotProps={{
    paper: {
     component: 'form',
     onSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
     },
    },
   }}
  >
   <DialogTitle>
    <div className='flex justify-between gap-4 items-center'>
     <span className='text-base font-medium'>جستجو</span>
     <IconButton color='error' onClick={onClose}>
      <CloseOutlinedIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='p-4 sticky top-0 bg-background'>
     <TextField
      sx={{
       '& .MuiInputBase-root': {
        borderRadius: '0.8rem',
       },
      }}
      slotProps={{
       input: {
        endAdornment: (
         <InputAdornment position='end'>
          <SearchOutlinedIcon color='primary' />
         </InputAdornment>
        ),
       },
      }}
      className='[&_::placeholder]:text-[0.9rem]'
      placeholder='عبارت مورد نظر را جستجو کنید...'
      size='medium'
      autoFocus
      fullWidth
     />
    </div>
    <section className='p-4 pt-0'>
     {['خدمــات', 'پروژه‌هـــا'].map((item) => (
      <article key={item} className='mb-6'>
       <div className='flex gap-4 items-center mb-4'>
        <h3 className='text-primary-dark text-base font-medium'>{item}</h3>
        <div className='flex-grow h-[1px] bg-primary-dark'></div>
       </div>
       <ul className='grid gap-2'>
        {[1, 2, 3, 4].map((item) => (
         <li
          key={item}
          className='transition-colors p-2 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900'
         >
          <Link href={'#'} className='flex flex-col md:flex-row md:gap-4'>
           <div className='shrink-0 mb-2 h-[9rem] md:h-[6rem] md:w-[8rem] rounded-lg overflow-hidden'>
            <img
             className='h-full w-full object-cover object-center'
             src='/services/security-camera-installation.jpg'
             alt='search image'
            />
           </div>
           <div className='flex-grow'>
            <h3 className='text-base font-medium text-secondary mb-2'>
             تفاوت پشتیبانی شبکه فیزیکی و نرم افزاری
            </h3>
            <p className='text-xs'>
             در دنیای پرشتاب فناوری اطلاعات، پشتیبانی سیستم‌ها یکی از عوامل
             کلیدی در دنیای پرشتاب فناوری اطلاعات، پشتیبانی سیستم‌ها یکی از
             عوامل کلیدی برای حفظ ....
            </p>
           </div>
          </Link>
         </li>
        ))}
       </ul>
      </article>
     ))}
    </section>
   </DialogContent>
  </Dialog>
 );
}
