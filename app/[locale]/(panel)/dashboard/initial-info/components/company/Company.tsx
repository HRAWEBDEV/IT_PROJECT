'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Company() {
 const { initialInfo } = useWebsiteDictionary() as {
  initialInfo: Dic;
 };
 return (
  <section>
   <h1 className='font-bold text-2xl mb-4'>{initialInfo.title as string}</h1>
   <form className='bg-background border border-neutral-300 dark:border-neutral-700 rounded-lg p-4'>
    <div className='grid gap-4'>
     <div className='grid grid-cols-2 gap-4'>
      <TextField size='small' label={initialInfo.name as string} />
      <TextField size='small' label={initialInfo.nationalCode as string} />
      <TextField size='small' label={initialInfo.email as string} />
      <TextField size='small' label={initialInfo.faxNumber as string} />
     </div>
     <div className='grid gap-4'>
      <div className='flex gap-4'>
       <TextField
        className='flex-grow'
        fullWidth
        size='small'
        label={initialInfo.telePhoneNumber as string}
       />
       <div className='flex gap-2'>
        <IconButton color='error'>
         <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton color='secondary'>
         <AddCircleOutlineIcon />
        </IconButton>
       </div>
      </div>
     </div>
     <div className='grid gap-4'>
      <div className='flex gap-4'>
       <TextField
        className='flex-grow'
        size='small'
        label={initialInfo.mobileNumber as string}
       />
       <div className='flex gap-2'>
        <IconButton color='error'>
         <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton color='secondary'>
         <AddCircleOutlineIcon />
        </IconButton>
       </div>
      </div>
     </div>
     <TextField
      multiline
      rows={2}
      fullWidth
      size='small'
      label={initialInfo.address as string}
     />
     <TextField
      multiline
      rows={4}
      fullWidth
      size='small'
      label={initialInfo.description as string}
     />
    </div>
    <div className='flex justify-end gap-4 mt-6'>
     <Button className='w-[8rem]' variant='contained' color='primary'>
      {initialInfo.save as string}
     </Button>
    </div>
   </form>
  </section>
 );
}
