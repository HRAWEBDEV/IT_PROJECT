'use client';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function ProjectsFilters({ dic }: Props) {
 return (
  <div className='container'>
   <div className='mb-4 border border-neutral-300 dark:border-neutral-700 p-4 rounded-lg grid gap-4 grid-cols-2 lg:grid-cols-[repeat(4,minmax(0rem,15rem))]'>
    <TextField
     className='col-span-full lg:col-auto'
     size='small'
     label={dic.search as string}
     slotProps={{
      input: {
       endAdornment: (
        <InputAdornment position='end' className='-me-2'>
         <SearchOutlinedIcon color='primary' />
        </InputAdornment>
       ),
      },
     }}
    />
    <Autocomplete
     options={[]}
     size='small'
     renderInput={(params) => (
      <TextField {...params} label={dic.categories as string} />
     )}
    />
    <Autocomplete
     options={[]}
     size='small'
     renderInput={(params) => (
      <TextField {...params} label={dic.show as string} />
     )}
    />
   </div>
  </div>
 );
}
