'use client';
import { forwardRef, RefObject } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { type BlogFilters } from '../../schemas/blogFilters';
import { useFormContext, Controller } from 'react-hook-form';
import { type WithDictionary } from '@/localization/locales';
import {
 type Tag,
 type BlogCategory,
} from '@/services/api-actions/globalApiActions';

type Props = WithDictionary & {
 blogCategories: BlogCategory[];
 isLoadingBlogCategory: boolean;
 filtersRef: RefObject<HTMLDivElement | null>;
 blogTags: Tag[];
 isLoadingBlogTags: boolean;
};

const ArticleFilters = forwardRef<HTMLDivElement, Props>(
 function ArticleFilters(
  {
   dic,
   blogCategories,
   isLoadingBlogCategory,
   filtersRef,
   blogTags,
   isLoadingBlogTags,
  },
  ref
 ) {
  const { register, control, watch } = useFormContext<BlogFilters>();
  const category = watch('category');
  const tag = watch('tag');
  const search = watch('search');

  return (
   <div className='container' ref={ref}>
    <div className='mb-4 border border-neutral-300 dark:border-neutral-700 p-4 rounded-lg grid gap-4 lg:grid-cols-[repeat(4,minmax(0rem,15rem))]'>
     <TextField
      {...(() => {
       const reg = { ...register('search') };
       return {
        ...reg,
        onChange: (e) => {
         reg.onChange(e);
         filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
        },
       };
      })()}
      className='col-span-full lg:col-auto'
      type='search'
      size='small'
      label={dic.search as string}
      slotProps={{
       inputLabel: {
        shrink: !!search || undefined,
       },
       input: {
        endAdornment: (
         <InputAdornment position='end' className='-me-2'>
          <SearchOutlinedIcon color='primary' />
         </InputAdornment>
        ),
       },
      }}
     />
     <Controller
      control={control}
      name='category'
      render={({ field }) => (
       <Autocomplete
        {...field}
        loading={isLoadingBlogCategory}
        value={field.value || null}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => {
         field.onChange(value);
         filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        options={blogCategories.map((item) => ({
         id: item.id.toString(),
         name: item.name,
        }))}
        size='small'
        renderInput={(params) => (
         <TextField
          {...params}
          label={dic.categories as string}
          slotProps={{
           inputLabel: {
            shrink: !!category || undefined,
           },
          }}
         />
        )}
       />
      )}
     />
     <Controller
      control={control}
      name='tag'
      render={({ field }) => (
       <Autocomplete
        {...field}
        loading={isLoadingBlogTags}
        value={field.value || null}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => {
         field.onChange(value);
         filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        options={blogTags.map((item) => ({
         id: item.id.toString(),
         name: item.name,
        }))}
        size='small'
        renderInput={(params) => (
         <TextField
          {...params}
          label={dic.tags as string}
          slotProps={{
           inputLabel: {
            shrink: !!tag || undefined,
           },
          }}
         />
        )}
       />
      )}
     />
    </div>
   </div>
  );
 }
);

ArticleFilters.displayName = 'ArticleFilters';

export default ArticleFilters;
