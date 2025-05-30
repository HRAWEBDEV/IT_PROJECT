import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { Controller, useFormContext } from 'react-hook-form';
import { type UsersFiltersSchema } from '../../schemas/usersFilters';
import SearchIcon from '@mui/icons-material/Search';
import { type Dic } from '@/localization/locales';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';

type Props = {
 setShowRolesHelp: (value: boolean) => void;
};

export default function UsersFilters({ setShowRolesHelp }: Props) {
 const { control, register } = useFormContext<UsersFiltersSchema>();
 const { users } = useWebsiteDictionary() as {
  users: Dic;
 };

 return (
  <form
   onSubmit={(e) => e.preventDefault()}
   className='flex flex-wrap flex-col lg:flex-row lg:justify-between bg-background border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 mb-4 gap-4'
  >
   <div className='grid lg:items-center lg:grid-cols-[repeat(1,minmax(0,20rem))_repeat(3,max-content)] gap-4'>
    <TextField
     {...register('search')}
     size='small'
     label={users.search as string}
     type='search'
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
    <Controller
     control={control}
     name='disabled'
     render={({ field }) => (
      <FormControlLabel
       control={<Checkbox {...field} checked={field.value} />}
       label={users.disabled as string}
      />
     )}
    />
    <Controller
     control={control}
     name='blackList'
     render={({ field }) => (
      <FormControlLabel
       control={<Checkbox {...field} checked={field.value} />}
       label={users.blackList as string}
      />
     )}
    />
    <Controller
     control={control}
     name='verified'
     render={({ field }) => (
      <FormControlLabel
       control={<Checkbox {...field} checked={field.value} />}
       label={users.verfied as string}
      />
     )}
    />
   </div>
   <div className='flex justify-end'>
    <Button
     variant='outlined'
     color='warning'
     onClick={() => {
      setShowRolesHelp(true);
     }}
    >
     <div className='flex items-center gap-2'>
      <HelpIcon fontSize='medium' />
      {users.rolesHelp as string}
     </div>
    </Button>
   </div>
  </form>
 );
}
