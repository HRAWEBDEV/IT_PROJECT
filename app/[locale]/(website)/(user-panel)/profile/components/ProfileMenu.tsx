'use client';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';

export default function ProfileMenu() {
 return (
  <aside className='py-4'>
   <div className='sticky top-0 rounded-lg border border-neutral-300 dark:border-neutral-700'>
    <div className='text-base text-center p-4 text-primary-dark font-medium border-b border-neutral-300 dark:border-neutral-700'>
     <span>حمیدرضا اکبری</span>
    </div>
    <ul>
     <li>
      <Link
       href='#'
       className='flex p-4 ps-6 border-b border-neutral-300 dark:border-neutral-700 relative before:content-[""] before:absolute before:start-0 before:inset-y-0 before:w-1 before:bg-transparent before:rounded-ee-sm before:rounded-se-sm [&[aria-selected="true"]]:before:bg-primary-dark hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors'
      >
       <div className='flex gap-4 items-center'>
        <BadgeIcon />
        <span className='font-medium'>اطلاعات کاربر</span>
       </div>
      </Link>
     </li>
     <li>
      <Link
       href='profile/favorites'
       className='flex p-4 ps-6 border-b border-neutral-300 dark:border-neutral-700 relative before:content-[""] before:absolute before:start-0 before:inset-y-0 before:w-1 before:bg-transparent before:rounded-ee-sm before:rounded-se-sm [&[aria-selected="true"]]:before:bg-primary-dark hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors'
      >
       <div className='flex gap-4 items-center'>
        <FavoriteIcon />
        <span className='font-medium'>علاقه‌مندی‌ها</span>
       </div>
      </Link>
     </li>
     <li>
      <Link
       href='#'
       className='flex p-4 ps-6 relative before:content-[""] before:absolute before:start-0 before:inset-y-0 before:w-1 before:bg-transparent before:rounded-ee-sm before:rounded-se-sm [&[aria-selected="true"]]:before:bg-primary-dark hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors'
      >
       <div className='flex gap-4 items-center'>
        <LogoutIcon color='error' />
        <span className='font-medium'>خروج</span>
       </div>
      </Link>
     </li>
    </ul>
   </div>
  </aside>
 );
}
