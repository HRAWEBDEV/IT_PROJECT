'use client';
import { useState } from 'react';
import ArticleFilters from './ArticleFilters';
import ArticlesList from './ArticlesList';
import Pagination from '@mui/material/Pagination';
import { useQuery } from '@tanstack/react-query';
import {
 getBlogs,
 getBlogCategories,
} from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type BlogFilters, blogFiltersSchema } from '../../schemas/blogFilters';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function Articles({ dic }: Props) {
 const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
 });
 const { locale } = useAppConfig();

 const {
  data: blogCategories = [],
  isLoading: blogCategoriesLoading,
  isFetching: blogCategoriesFetching,
 } = useQuery({
  queryKey: ['blogCategories'],
  async queryFn() {},
 });

 const {
  data: blogs = [],
  isLoading: blogsLoading,
  isFetching: blogsFetching,
 } = useQuery({
  queryKey: ['blogs'],
  async queryFn() {},
 });

 const filtersUseForm = useForm<BlogFilters>({
  resolver: zodResolver(blogFiltersSchema),
  defaultValues: {
   search: '',
  },
 });
 return (
  <FormProvider {...filtersUseForm}>
   <section>
    <ArticleFilters dic={dic} />
    <ArticlesList dic={dic} />
    <div className='flex justify-center mb-8 text-lg font-medium'>
     <Pagination
      size='large'
      count={5}
      shape='rounded'
      color='secondary'
      sx={{
       '& .MuiButtonBase-root': {
        fontSize: 'inherit',
       },
      }}
     />
    </div>
   </section>
  </FormProvider>
 );
}
