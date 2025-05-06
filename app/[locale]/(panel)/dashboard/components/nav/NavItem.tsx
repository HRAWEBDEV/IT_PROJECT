import { useState } from 'react';
import { type NavigationItem } from '../../utils/navgationList';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import NavList from './NavList';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
 item: NavigationItem;
};

export default function NavItem({ item }: Props) {
 const [isOpen, setIsOpen] = useState(false);
 const pathname = usePathname();
 const { navigation } = useWebsiteDictionary() as {
  navigation: Dic;
 };
 return (
  <li>
   <Link
    aria-selected={pathname.includes(item.href)}
    className='flex items-center justify-between me-2 p-3 rounded-lg transition-colors hover:bg-sky-100 dark:hover:bg-sky-800 aria-selected:bg-sky-100 dark:aria-selected:bg-sky-800'
    href={item.href}
    onClick={() => setIsOpen(!isOpen)}
   >
    <div>
     <span className='font-medium'>{navigation[item.title] as string}</span>
    </div>
    {!!item.children?.length &&
     (isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
   </Link>
   <div>
    <AnimatePresence>
     {!!item.children?.length && isOpen && (
      <motion.div
       className='overflow-hidden'
       initial={{ height: 0 }}
       animate={{ height: 'auto' }}
       exit={{ height: 0 }}
      >
       <NavList isSubList navigationList={item.children} />
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </li>
 );
}
