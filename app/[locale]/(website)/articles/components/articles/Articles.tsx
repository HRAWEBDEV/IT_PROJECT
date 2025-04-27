import ArticleFilters from './ArticleFilters';
import ArticlesList from './ArticlesList';
import Pagination from '@mui/material/Pagination';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function Articles({ dic }: Props) {
 return (
  <section>
   <ArticleFilters dic={dic} />
   <ArticlesList dic={dic} />
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
