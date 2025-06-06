import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { type FilterSchema } from '../schemas/filtersSchema';
import { type TagCategory } from '@/services/api-actions/globalApiActions';
import { useAccessContext } from '../../services/access/accessContext';

type Props = {
 setOpenAddTag: () => void;
 tagCategories: TagCategory[];
 isLoadingCategories: boolean;
};

export default function TagsFilters({
 tagCategories,
 isLoadingCategories,
 setOpenAddTag,
}: Props) {
 const { roleAccess } = useAccessContext();
 const { tags } = useWebsiteDictionary() as {
  tags: Dic;
 };
 const { control } = useFormContext<FilterSchema>();
 return (
  <form
   onSubmit={(e) => e.preventDefault()}
   className='bg-background grid items-center grid-cols-[minmax(0,20rem)_max-content] justify-between border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 mb-4 gap-4'
  >
   <Controller
    control={control}
    name='category'
    render={({ field }) => (
     <Autocomplete
      disableClearable={true}
      loading={isLoadingCategories}
      {...field}
      value={field.value || null}
      onChange={(_, value) => field.onChange(value)}
      getOptionLabel={(option) => option.name}
      size='small'
      options={tagCategories.map((item) => ({
       id: item.id.toString(),
       name: item.name,
      }))}
      renderInput={(params) => (
       <TextField {...params} label={tags.category as string} />
      )}
     />
    )}
   />
   {roleAccess.write && (
    <Button variant='outlined' color='secondary' onClick={setOpenAddTag}>
     {tags.addTag as string}
    </Button>
   )}
  </form>
 );
}
