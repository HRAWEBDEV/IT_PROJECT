import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import Button from '@mui/material/Button';

type Props = {
 setOpenAddCategory: () => void;
};

export default function CategoryFilters({ setOpenAddCategory }: Props) {
 const { articlesCategories } = useWebsiteDictionary() as {
  articlesCategories: Dic;
 };
 return (
  <form
   onSubmit={(e) => e.preventDefault()}
   className='bg-background grid items-center grid-cols-[minmax(0,20rem)_max-content] justify-between border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 mb-4 gap-4'
  >
   <div></div>
   <div className='flex items-center gap-2'>
    <Button variant='outlined' color='secondary' onClick={setOpenAddCategory}>
     {articlesCategories.addCategory as string}
    </Button>
   </div>
  </form>
 );
}
