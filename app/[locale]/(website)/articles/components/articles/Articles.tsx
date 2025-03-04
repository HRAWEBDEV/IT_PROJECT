import ArticleFilters from './ArticleFilters';
import ArticlesList from './ArticlesList';
import Pagination from '@mui/material/Pagination';

export default function Articles() {
 return (
  <section>
   <ArticleFilters />
   <ArticlesList />
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
