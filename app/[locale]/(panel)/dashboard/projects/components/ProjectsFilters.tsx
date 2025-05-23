import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { type FilterSchema } from '../schemas/filtersSchema';
import {
 type ProjectCategory,
 type ProjectState,
} from '@/services/api-actions/globalApiActions';
import { useAccessContext } from '../../services/access/accessContext';

type Props = {
 projectCategories: ProjectCategory[];
 projectStates: ProjectState[];
 isLoadingCategories: boolean;
 isLoadingStates: boolean;
 setOpenAddProject: () => void;
 setOpenAddCategory: () => void;
};

export default function ProjectsFilters({
 projectCategories,
 isLoadingCategories,
 setOpenAddProject,
 setOpenAddCategory,
 projectStates,
 isLoadingStates,
}: Props) {
 const { roleAccess } = useAccessContext();
 const { projects, projectsCategories } = useWebsiteDictionary() as {
  projects: Dic;
  projectsCategories: Dic;
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
      options={projectCategories.map((item) => ({
       id: item.id.toString(),
       name: item.name,
      }))}
      renderInput={(params) => (
       <TextField {...params} label={projects.category as string} />
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
      options={projectStates.map((item) => ({
       id: item.id.toString(),
       name: item.name,
      }))}
      renderInput={(params) => (
       <TextField {...params} label={projects.state as string} />
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
      {projectsCategories.addCategory as string}
     </Button>
     <Button
      variant='outlined'
      color='secondary'
      onClick={setOpenAddProject}
      disabled={!projectCategories.length}
     >
      {projects.addProject as string}
     </Button>
    </div>
   )}
  </form>
 );
}
