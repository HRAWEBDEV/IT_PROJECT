'use client';
import Link from 'next/link';
import { GradientButton } from '@/components/Button/GradientButton';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { type WithDictionary } from '@/localization/locales';
import Skeleton from '@mui/material/Skeleton';
import { useAppConfig } from '@/services/app-config/appConfig';
import { type Project } from '@/services/api-actions/globalApiActions';
import ImageWrapper from '@/components/ImageWrapper';

type Props = WithDictionary & {
 isLoadingProjects: boolean;
 projects: Project[];
};

export default function ProjectsList({
 dic,
 isLoadingProjects,
 projects,
}: Props) {
 const { locale } = useAppConfig();
 const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
 });

 if (projects.length === 0) {
  return (
   <div className='container mb-6'>
    <p className='text-center text-base font-medium'>
     {dic.noItemFound as string}
    </p>
   </div>
  );
 }
 return (
  <div className='container mb-6'>
   <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
    {isLoadingProjects &&
     [1, 2, 3, 4].map((item) => (
      <li key={item}>
       <Skeleton
        variant='rounded'
        height={300}
        sx={{
         backgroundColor: (theme) =>
          theme.palette.mode == 'light'
           ? theme.palette.neutral[200]
           : theme.palette.neutral[700],
        }}
       />
      </li>
     ))}
    {!isLoadingProjects &&
     projects.map((item) => {
      const projectLink = `/projects/${item.id}?name=${item.header}`;
      return (
       <li key={item.id}>
        <Link
         href={projectLink}
         style={{
          transition: 'transform 0.5s ease',
         }}
         className='border border-neutral-300 dark:border-neutral-700 block bg-background rounded-lg text-foreground hover:scale-105'
        >
         <div className='p-2'>
          <div className='relative after:content-* after:absolute after:inset-0 after:bg-black/10 dark:after:bg-black/20 h-[16rem]'>
           <ImageWrapper
            img={{
             src: `${process.env.NEXT_PUBLIC_BASE_URL}/${item.imageUrl}`,
             alt: 'aritcle-imgage',
             className: 'w-full h-full object-cover object-center rounded-lg',
            }}
            wrapper={{
             className: 'h-full w-full',
            }}
           />
          </div>
         </div>
         <div className='px-4 py-2 pb-4'>
          <div className='mb-1 flex'>
           <div className='text-primary-dark font-medium'>
            <span className='text-[0.7rem]'>
             {dateFormatter.format(new Date(item.createDateTimeOffset))}
            </span>
           </div>
          </div>
          <h3 className='text-lg font-medium text-secondary mb-3'>
           {item.header}
          </h3>
          <p className='mb-6 leading-6'>{item.description}</p>
          <div className='flex justify-between items-center'>
           <div className='flex gap-1'>
            <IconButton
             color='primary'
             className='!bg-sky-300/20 !dark:bg-sky-700/20'
             onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!navigator.share) return;
              navigator.share({
               title: item.header,
               text: item.description,
               url: projectLink,
              });
             }}
            >
             <ShareOutlinedIcon />
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
      );
     })}
   </ul>
  </div>
 );
}
