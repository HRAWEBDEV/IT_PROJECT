import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { Controller, useFormContext } from 'react-hook-form';
import { type ContactUsFiltersSchema } from '../../schemas/contactUsFilters';
import SearchIcon from '@mui/icons-material/Search';
import { type Dic } from '@/localization/locales';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';

type Props = {
 test: string;
};

export default function ContactUsFilters({}: Props) {
 const { control, register } = useFormContext<ContactUsFiltersSchema>();
 const { initialInfo } = useWebsiteDictionary() as {
  initialInfo: Dic;
 };

 return (
  <form
   onSubmit={(e) => e.preventDefault()}
   className='bg-background grid lg:grid-cols-[minmax(0,20rem)_max-content] lg:items-center border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 mb-4 gap-4'
  >
   <TextField
    {...register('search')}
    size='small'
    label={initialInfo.search as string}
    slotProps={{
     input: {
      endAdornment: (
       <InputAdornment position='end' className='-me-2'>
        <SearchIcon color='primary' />
       </InputAdornment>
      ),
     },
    }}
   />
   <div className='flex flex-wrap'>
    <Controller
     control={control}
     name='isRead'
     render={({ field }) => (
      <FormControlLabel
       label={initialInfo.isRead as string}
       control={<Checkbox {...field} />}
      />
     )}
    />
    <Controller
     control={control}
     name='deleted'
     render={({ field }) => (
      <FormControlLabel
       label={initialInfo.deleted as string}
       control={<Checkbox {...field} />}
      />
     )}
    />
   </div>
  </form>
 );
}
