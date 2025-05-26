import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { type Dic, type WithDictionary } from '@/localization/locales';
import { getBlogs, getProjects } from '@/services/api-actions/globalApiActions';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ImageWrapper from '@/components/ImageWrapper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

type Props = WithDictionary & {
 onClose: () => void;
 isOpen: boolean;
};

export default function Search({ dic, onClose, isOpen }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { locale } = useAppConfig();
 const [searchText, setSearchText] = useState('');
 const debouncedSearchText = useDebounceValue(searchText, 500);

 const {
  data: blogs,
  isLoading: isLoadingBlogs,
  isSuccess: isSuccessBlogs,
 } = useQuery({
  enabled: Boolean(debouncedSearchText),
  queryKey: ['search', 'articles', debouncedSearchText],
  queryFn() {
   return getBlogs({
    locale,
    blogStateID: 2,
    pagination: {
     offset: 1,
     limit: 5,
    },
    searchText: debouncedSearchText,
   }).then((res) => res.data.payload.Blogs);
  },
 });

 const {
  data: projects,
  isLoading: isLoadingProjects,
  isSuccess: isSuccessProjects,
 } = useQuery({
  enabled: Boolean(debouncedSearchText),
  queryKey: ['search', 'projects', debouncedSearchText],
  queryFn() {
   return getProjects({
    locale,
    projectStateID: 2,
    pagination: {
     offset: 1,
     limit: 5,
    },
    searchText: debouncedSearchText,
    showForCards: false,
   }).then((res) => res.data.payload.Projects);
  },
 });

 let searchContent = <div></div>;
 let resultProjects = (
  <div className='text-center'>{dic.noItemFound as string}</div>
 );
 let resultBlogs = (
  <div className='text-center'>{dic.noItemFound as string}</div>
 );

 if (isSuccessBlogs) {
  resultBlogs = (
   <ul className='grid gap-2'>
    {!!blogs.rows.length ? (
     blogs.rows.map((item) => (
      <li
       key={item.id}
       className='transition-colors p-2 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900'
      >
       <Link
        href={`/articles/${item.id}?name=${item.header}`}
        className='flex flex-col md:flex-row md:gap-4'
       >
        <div className='shrink-0 mb-2 h-[12rem] md:h-[9rem] md:w-[9rem] rounded-lg overflow-hidden'>
         <ImageWrapper
          img={{
           className:
            'h-full w-full object-cover object-center border border-neutral-300 dark:border-neutral-700 rounded-lg',
           src: `${process.env.NEXT_PUBLIC_BASE_URL}${item.imageUrl}`,
           alt: 'search image',
          }}
          wrapper={{
           className: 'h-full w-full',
          }}
         />
        </div>
        <div className='flex-grow'>
         <h3 className='text-base font-medium text-secondary mb-1'>
          {item.header}
         </h3>
         <p className='text-xs'>{item.description}</p>
        </div>
       </Link>
      </li>
     ))
    ) : (
     <div className='text-center'>{dic.noItemFound as string}</div>
    )}
   </ul>
  );
 }
 if (isSuccessProjects) {
  resultProjects = (
   <ul className='grid gap-2'>
    {!!projects.rows.length ? (
     projects.rows.map((item) => (
      <li
       key={item.id}
       className='transition-colors p-2 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900'
      >
       <Link
        href={`/projects/${item.id}?name=${item.header}`}
        className='flex flex-col md:flex-row md:gap-4'
       >
        <div className='shrink-0 mb-2 lg:mb-0 h-[12rem] md:h-[9rem] md:w-[9rem] rounded-lg overflow-hidden'>
         <ImageWrapper
          img={{
           className:
            'h-full w-full object-cover object-center border border-neutral-300 dark:border-neutral-700 rounded-lg',
           src: `${process.env.NEXT_PUBLIC_BASE_URL}${item.imageUrl}`,
           alt: 'search image',
          }}
          wrapper={{
           className: 'h-full w-full',
          }}
         />
        </div>
        <div className='flex-grow'>
         <h3 className='text-base font-medium text-secondary mb-2'>
          {item.header}
         </h3>
         <p className='text-xs'>{item.description}</p>
        </div>
       </Link>
      </li>
     ))
    ) : (
     <div className='text-center'>{dic.noItemFound as string}</div>
    )}
   </ul>
  );
 }

 if (isLoadingProjects || isLoadingBlogs) {
  searchContent = (
   <div className='flex justify-center items-center h-[8rem]'>
    <CircularProgress />
   </div>
  );
 }

 if (debouncedSearchText && !isLoadingProjects && !isLoadingBlogs) {
  searchContent = (
   <section className='p-4 pt-0'>
    <article className='mb-6'>
     <div className='flex gap-4 items-center mb-4'>
      <h3 className='text-primary-dark text-base font-medium'>
       {(dic.search as Dic).articles as string}
      </h3>
      <div className='flex-grow h-[1px] bg-primary-dark'></div>
      <Button
       LinkComponent={Link}
       href={`/articles?searchText=${searchText}`}
       color='warning'
      >
       {(dic.search as Dic).showAll as string}
      </Button>
     </div>
     {resultBlogs}
    </article>
    <article className='mb-6'>
     <div className='flex gap-4 items-center mb-4'>
      <h3 className='text-primary-dark text-base font-medium'>
       {(dic.search as Dic).projects as string}
      </h3>
      <div className='flex-grow h-[1px] bg-primary-dark'></div>
      <Button
       LinkComponent={Link}
       href={`/projects?searchText=${searchText}`}
       color='warning'
      >
       {(dic.search as Dic).showAll as string}
      </Button>
     </div>
     {resultProjects}
    </article>
   </section>
  );
 }

 useEffect(() => {
  setSearchText('');
 }, [isOpen]);
 return (
  <Dialog
   className='[&_.MuiPaper-root]:backdrop-blur-sm'
   sx={{
    '& .MuiDialogContent-root': {
     padding: 0,
    },
   }}
   open={isOpen}
   fullWidth
   fullScreen={!isLargeDevice}
   maxWidth='sm'
   scroll='paper'
   onClose={onClose}
   slotProps={{
    paper: {
     component: 'form',
     onSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
     },
    },
   }}
  >
   <DialogTitle>
    <div className='flex justify-between gap-4 items-center'>
     <span className='text-base font-medium'>
      {(dic.search as Dic).title as string}
     </span>
     <IconButton color='error' onClick={onClose}>
      <CloseOutlinedIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='p-4 sticky top-0 bg-background z-10'>
     <TextField
      name='search'
      type='search'
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      sx={{
       '& .MuiInputBase-root': {
        borderRadius: '0.8rem',
       },
      }}
      slotProps={{
       input: {
        endAdornment: (
         <InputAdornment position='end'>
          <SearchOutlinedIcon color='primary' />
         </InputAdornment>
        ),
       },
      }}
      className='[&_::placeholder]:text-[0.9rem]'
      placeholder={(dic.search as Dic).placeholder as string}
      size='medium'
      autoFocus
      fullWidth
     />
    </div>
    {searchContent}
   </DialogContent>
  </Dialog>
 );
}
