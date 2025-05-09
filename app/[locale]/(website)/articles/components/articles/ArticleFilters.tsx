'use client';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { type BlogFilters } from '../../schemas/blogFilters';
import { useFormContext, Controller } from 'react-hook-form';
import { type WithDictionary } from '@/localization/locales';
import { type BlogCategory } from '@/services/api-actions/globalApiActions';

type Props = WithDictionary & {
 blogCategories: BlogCategory[];
 isLoadingBlogCategory: boolean;
};

export default function ArticleFilters({
 dic,
 blogCategories,
 isLoadingBlogCategory,
}: Props) {
 const { register, control, watch } = useFormContext<BlogFilters>();
 const category = watch('category');
 const search = watch('search');
 return (
  <div className='container'>
   <div className='mb-4 border border-neutral-300 dark:border-neutral-700 p-4 rounded-lg grid gap-4 lg:grid-cols-[repeat(4,minmax(0rem,15rem))]'>
    <TextField
     {...register('search')}
     className='col-span-full lg:col-auto'
     type='search'
     size='small'
     label={dic.search as string}
     slotProps={{
      inputLabel: {
       shrink: !!search || undefined,
      },
      input: {
       endAdornment: (
        <InputAdornment position='end' className='-me-2'>
         <SearchOutlinedIcon color='primary' />
        </InputAdornment>
       ),
      },
     }}
    />
    <Controller
     control={control}
     name='category'
     render={({ field }) => (
      <Autocomplete
       {...field}
       loading={isLoadingBlogCategory}
       value={field.value || null}
       getOptionLabel={(option) => option.name}
       onChange={(_, value) => field.onChange(value)}
       options={blogCategories.map((item) => ({
        id: item.id.toString(),
        name: item.name,
       }))}
       size='small'
       renderInput={(params) => (
        <TextField
         {...params}
         label={dic.categories as string}
         slotProps={{
          inputLabel: {
           shrink: !!category || undefined,
          },
         }}
        />
       )}
      />
     )}
    />
   </div>
  </div>
 );
}
