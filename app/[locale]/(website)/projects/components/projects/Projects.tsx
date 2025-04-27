import ProjectsFilters from './ProjectsFilters';
import ProjectsList from './ProjectsList';
import Pagination from '@mui/material/Pagination';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function Projects({ dic }: Props) {
 return (
  <section>
   <ProjectsFilters dic={dic} />
   <ProjectsList dic={dic} />
   <div className='flex justify-center mb-8 text-lg font-medium'>
    <Pagination
     size='large'
     count={5}
     shape='rounded'
     color='secondary'
     sx={{
      '& .MuiButtonBase-root': {
       fontSize: 'inherit',
      },
     }}
    />
   </div>
  </section>
 );
}
