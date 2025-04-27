'use client';
import Link from 'next/link';
import { GradientButton } from '@/components/Button/GradientButton';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 hour: '2-digit',
 minute: '2-digit',
});

export default function ArticlesList({ dic }: Props) {
 return (
  <div className='container mb-6'>
   <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
     <li key={item}>
      <Link
       href='#'
       style={{
        transition: 'transform 0.5s ease',
       }}
       className='border border-neutral-300 dark:border-neutral-700 block bg-background rounded-lg text-foreground hover:scale-105'
      >
       <div className='p-2'>
        <div className='relative after:content-* after:absolute after:inset-0 after:bg-black/10 dark:after:bg-black/20 h-[16rem]'>
         <img
          src='/services/security-camera-installation.jpg'
          alt='aritcle-imgage'
          className='w-full h-full object-cover object-center rounded-lg'
         />
        </div>
       </div>
       <div className='px-4 py-2 pb-4'>
        <div className='mb-1 flex'>
         <div className='text-primary-dark font-medium'>
          <span className='text-[0.7rem]'>
           {dateFormatter.format(new Date())}
          </span>
         </div>
        </div>
        <h3 className='text-lg font-medium text-secondary mb-3'>
         تفاوت پشتیبانی شبکه فیزیکی و نرم افزاری
        </h3>
        <p className='mb-6 leading-6'>
         در دنیای پرشتاب فناوری اطلاعات، پشتیبانی سیستم‌ها یکی از عوامل کلیدی در
         دنیای پرشتاب فناوری اطلاعات، پشتیبانی سیستم‌ها یکی از عوامل کلیدی برای
         حفظ ....
        </p>
        <div className='flex justify-between items-center'>
         <div className='flex gap-1'>
          <IconButton
           color='primary'
           className='!bg-sky-300/20 !dark:bg-sky-700/20'
          >
           <ShareOutlinedIcon />
          </IconButton>
          <IconButton
           color='error'
           className='!bg-red-300/20 !dark:bg-red-700/20'
          >
           <FavoriteBorderOutlinedIcon />
          </IconButton>
         </div>
         <GradientButton>
          <div className='flex gap-3 items-center'>
           <span>{dic.continue as string}</span>
           <VisibilityIcon />
          </div>
         </GradientButton>
        </div>
       </div>
       <div></div>
      </Link>
     </li>
    ))}
   </ul>
  </div>
 );
}
