import ProjectsFilters from './ProjectsFilters';
import ProjectsList from './ProjectsList';
import Pagination from '@mui/material/Pagination';

export default function Projects() {
 return (
  <section>
   <ProjectsFilters />
   <ProjectsList />
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
