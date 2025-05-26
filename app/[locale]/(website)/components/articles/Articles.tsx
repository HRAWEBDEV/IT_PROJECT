'use client';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { type Dic, type WithDictionary } from '@/localization/locales';
import { type Blog } from '@/services/api-actions/globalApiActions';
import ImageWrapper from '@/components/ImageWrapper';
import { useAppConfig } from '@/services/app-config/appConfig';

type Props = WithDictionary & {
 serverBlogs: Blog[];
};

export default function Articles({ dic, serverBlogs }: Props) {
 const { locale } = useAppConfig();
 const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
 });
 return (
  <section
   id='articles'
   className='relative mb-4 bg-neutral-100 dark:bg-neutral-900 py-8'
  >
   <div className='container'>
    <div className='text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[calc(50%_-_5rem)] after:bottom-0 after:w-[10rem] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[calc(50%_-_7.5rem)] before:bottom-[1px] before:w-[15rem] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>
       {(dic.articles as Dic).title as string}
      </h2>
     </div>
    </div>
    <ul className='grid lg:grid-cols-2 mb-4'>
     {serverBlogs.slice(0, 4).map((item) => {
      const articleLink = `/articles/${item.id}`;
      return (
       <li key={item.id}>
        <Link
         href={articleLink}
         className='group transition-colors flex flex-col lg:flex-row gap-4 lg:items-start p-4 rounded-lg hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
        >
         <div className='shrink-0 rounded-lg overflow-hidden h-[14rem] lg:w-[12rem] lg:h-[10rem]'>
          <ImageWrapper
           img={{
            style: {
             transition: 'transform 0.3s ease',
            },
            loading: 'lazy',
            className:
             'h-full w-full object-cover object-center brightness-90 group-hover:scale-105',
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/${item.imageUrl}`,
            alt: 'services imageg',
           }}
           wrapper={{
            className: 'h-full w-full',
           }}
          />
         </div>
         <div className='flex-grow'>
          <h3 className='font-medium text-lg mb-2 text-primary-dark'>
           {item.header}
          </h3>
          <div className='text-[0.7rem] flex gap-2 flex-wrap'>
           <div className='flex gap-1 items-center text-secondary'>
            <CalendarMonthIcon fontSize='small' />
            <span>
             {dateFormatter.format(new Date(item.createDateTimeOffset))}
            </span>
           </div>
           <div></div>
           <div></div>
          </div>
          <p className='text-justify text-neutral-500 dark:text-neutral-200 mb-4'>
           {item.description.length > 100
            ? item.description.slice(0, 100) + '...'
            : item.description}
          </p>
          <div className='flex justify-between'>
           <div className='flex gap-1'>
            <IconButton
             size='small'
             color='primary'
             className='!bg-sky-300/20 !dark:bg-sky-700/20'
             onClick={(e) => {
              e.stopPropagation();
              if (!navigator.share) return;
              navigator.share({
               title: item.header,
               text: item.description,
               url: articleLink,
              });
             }}
            >
             <ShareOutlinedIcon />
            </IconButton>
            <IconButton
             size='small'
             color='error'
             className='!bg-red-300/20 !dark:bg-red-700/20'
            >
             <FavoriteBorderOutlinedIcon />
            </IconButton>
           </div>
           <Button size='small' variant='outlined'>
            <div>
             <span>{(dic.articles as Dic).continue as string}</span>
            </div>
           </Button>
          </div>
         </div>
        </Link>
       </li>
      );
     })}
    </ul>
    <div className='flex justify-end'>
     <Button
      LinkComponent={Link}
      href='/articles'
      className='min-w-[14rem]'
      size='large'
      variant='outlined'
      color='secondary'
     >
      <div className='flex gap-4'>
       <span className='font-medium'>
        {(dic.articles as Dic).viewAllArticles as string}
       </span>
       <div className='ltr:rotate-180'>
        <KeyboardBackspaceIcon />
       </div>
      </div>
     </Button>
    </div>
   </div>
  </section>
 );
}
