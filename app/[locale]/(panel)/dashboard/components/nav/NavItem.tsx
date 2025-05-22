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
import { useNavigationContext } from '@/app/[locale]/(website)/services/NavigationContext';
import { RoleAccessFormIDs } from '@/utils/roleAccessFormIDs';
import { useAuthCheck } from '@/services/auth/authCheckContext';

type Props = {
 item: NavigationItem;
};

export default function NavItem({ item }: Props) {
 const formID = RoleAccessFormIDs[item.title as keyof typeof RoleAccessFormIDs];
 const { userInfo } = useAuthCheck();
 let isAllowed = true;
 const { setNavIsVisible } = useNavigationContext();
 const [isOpen, setIsOpen] = useState(false);
 const pathname = usePathname();
 const { navigation } = useWebsiteDictionary() as {
  navigation: Dic;
 };

 if (formID && !item.children) {
  const navAccess = userInfo?.RoleAccesses.find((acc) => acc.formID === formID);
  isAllowed = navAccess?.read || true;
 }

 return isAllowed ? (
  <li>
   <Link
    aria-selected={pathname.endsWith(item.href)}
    className='flex items-center justify-between me-2 p-3 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-sky-100 dark:aria-selected:bg-sky-800'
    href={item.href}
    onClick={() => {
     setIsOpen(!isOpen);
     if (!item.children?.length) {
      setNavIsVisible(false);
     }
    }}
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
 ) : null;
}
