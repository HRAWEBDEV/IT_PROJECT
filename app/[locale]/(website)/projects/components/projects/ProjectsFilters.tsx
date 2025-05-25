'use client';
import { forwardRef, RefObject } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { type WithDictionary } from '@/localization/locales';
import { useFormContext, Controller } from 'react-hook-form';
import { type ProjectsFilters } from '../../schemas/projectsFilters';
import { type ProjectCategory } from '@/services/api-actions/globalApiActions';

type Props = WithDictionary & {
 projectsCategories: ProjectCategory[];
 isLoadingProjectsCategories: boolean;
 filtersRef: RefObject<HTMLDivElement | null>;
};

const ProjectsFilters = forwardRef<HTMLDivElement, Props>(
 function ProjectsFilters(
  { dic, projectsCategories, isLoadingProjectsCategories, filtersRef },
  ref
 ) {
  const { control, register, watch } = useFormContext<ProjectsFilters>();
  const search = watch('search');
  const category = watch('category');

  return (
   <div className='container' ref={ref}>
    <div className='mb-4 border border-neutral-300 dark:border-neutral-700 p-4 rounded-lg grid gap-4 grid-cols-2 lg:grid-cols-[repeat(4,minmax(0rem,15rem))]'>
     <TextField
      size='small'
      type='search'
      label={dic.search as string}
      {...(() => {
       const reg = { ...register('search') };
       return {
        ...reg,
        onChange: (e) => {
         reg.onChange(e);
         filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
        },
       };
      })()}
      slotProps={{
       input: {
        endAdornment: (
         <InputAdornment position='end' className='-me-2'>
          <SearchOutlinedIcon color='primary' />
         </InputAdornment>
        ),
       },
       inputLabel: {
        shrink: !!search || undefined,
       },
      }}
     />
     <Controller
      control={control}
      name='category'
      render={({ field }) => {
       return (
        <Autocomplete
         {...field}
         loading={isLoadingProjectsCategories}
         value={field.value}
         onChange={(_, value) => {
          field.onChange(value);
          filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
         }}
         options={projectsCategories.map((item) => ({
          id: item.id.toString(),
          name: item.name,
         }))}
         getOptionLabel={(option) => option.name}
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
       );
      }}
     />
    </div>
   </div>
  );
 }
);

export default ProjectsFilters;
