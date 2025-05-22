import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import Button from '@mui/material/Button';
import { useAccessContext } from '../../services/access/accessContext';

type Props = {
 setOpenAddCategory: () => void;
};

export default function ServicesCategoriesFilters({
 setOpenAddCategory,
}: Props) {
 const { roleAccess } = useAccessContext();
 const { servicesCategories } = useWebsiteDictionary() as {
  servicesCategories: Dic;
 };
 return (
  <form
   onSubmit={(e) => e.preventDefault()}
   className='bg-background grid items-center grid-cols-[minmax(0,20rem)_max-content] justify-between border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 mb-4 gap-4'
  >
   <div></div>
   {true && (
    <div className='flex items-center gap-2'>
     <Button variant='outlined' color='secondary' onClick={setOpenAddCategory}>
      {servicesCategories.addCategory as string}
     </Button>
    </div>
   )}
  </form>
 );
}
