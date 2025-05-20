import NavItem from './NavItem';
import { type NavigationItem } from '../../utils/navgationList';

type Props = { navigationList: NavigationItem[]; isSubList?: boolean };
export default function NavList({ navigationList, isSubList = false }: Props) {
 return (
  <ul
   data-sublist={isSubList}
   className='ms-2 relative before:hidden [&[data-sublist="true"]]:before:block [&[data-sublist="true"]]:before:content-[""] before:absolute before:top-0 before:bottom-0 before:start-0 before:w-[1px] before:bg-neutral-300 dark:before:bg-neutral-700'
  >
   {navigationList.map((item) => (
    <NavItem key={item.type} item={item} />
   ))}
  </ul>
 );
}
