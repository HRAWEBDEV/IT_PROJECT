'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import ErrorIcon from '@mui/icons-material/Error';

export default function NoAccessGranted() {
 const { noAccessGranted } = useWebsiteDictionary() as {
  noAccessGranted: string;
 };

 return (
  <div className='flex items-center justify-center min-h-[20rem] w-[min(100%,40rem)] mx-auto bg-background border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 flex-col gap-6'>
   <ErrorIcon
    className='text-red-600 dark:text-red-400'
    sx={{ fontSize: '6rem' }}
   />
   <p className='text-center text-lg text-red-600 dark:text-red-400'>
    {noAccessGranted}
   </p>
  </div>
 );
}
