import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { type FilterSchema } from '../schemas/filtersSchema';
import {
 type ServiceCategory,
 type ServiceState,
} from '@/services/api-actions/globalApiActions';
import { useAccessContext } from '../../services/access/accessContext';

type Props = {
 serviceCategories: ServiceCategory[];
 serviceStates: ServiceState[];
 isLoadingCategories: boolean;
 isLoadingStates: boolean;
 setOpenAddService: () => void;
 setOpenAddCategory: () => void;
};

export default function ServicesFilters({
 serviceCategories,
 isLoadingCategories,
 setOpenAddService,
 setOpenAddCategory,
 serviceStates,
 isLoadingStates,
}: Props) {
 const { roleAccess } = useAccessContext();
 const { services, servicesCategories } = useWebsiteDictionary() as {
  services: Dic;
  servicesCategories: Dic;
 };
 const { control } = useFormContext<FilterSchema>();
 return (
  <form
   onSubmit={(e) => e.preventDefault()}
   className='bg-background grid lg:items-center lg:grid-cols-[repeat(2,minmax(0,20rem))_minmax(max-content,1fr)]  border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 mb-4 gap-4'
  >
   <Controller
    control={control}
    name='category'
    render={({ field }) => (
     <Autocomplete
      loading={isLoadingCategories}
      {...field}
      value={field.value || null}
      onChange={(_, value) => field.onChange(value)}
      getOptionLabel={(option) => option.name}
      size='small'
      options={serviceCategories.map((item) => ({
       id: item.id.toString(),
       name: item.name,
      }))}
      renderInput={(params) => (
       <TextField {...params} label={services.category as string} />
      )}
     />
    )}
   />
   <Controller
    control={control}
    name='state'
    render={({ field }) => (
     <Autocomplete
      disableClearable={true}
      loading={isLoadingStates}
      {...field}
      value={field.value || null}
      onChange={(_, value) => field.onChange(value)}
      getOptionLabel={(option) => option.name}
      size='small'
      options={serviceStates.map((item) => ({
       id: item.id.toString(),
       name: item.name,
      }))}
      renderInput={(params) => (
       <TextField {...params} label={services.state as string} />
      )}
     />
    )}
   />
   {roleAccess.write && (
    <div className='flex items-center gap-2 justify-end'>
     <Button
      variant='outlined'
      color='info'
      onClick={() => setOpenAddCategory()}
     >
      {servicesCategories.addCategory as string}
     </Button>
     <Button
      variant='outlined'
      color='secondary'
      onClick={setOpenAddService}
      disabled={!serviceCategories.length}
     >
      {services.addService as string}
     </Button>
    </div>
   )}
  </form>
 );
}
