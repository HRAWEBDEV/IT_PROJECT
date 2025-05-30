'use client';
import { useState, useEffect, useRef } from 'react';
import ArticleFilters from './ArticleFilters';
import ArticlesList from './ArticlesList';
import Pagination from '@mui/material/Pagination';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type BlogFilters, blogFiltersSchema } from '../../schemas/blogFilters';
import { type WithDictionary } from '@/localization/locales';
import { GridPaginationModel } from '@mui/x-data-grid';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useAppConfig } from '@/services/app-config/appConfig';
import {
 type Blog,
 getBlogs,
 getBlogCategories,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { paginationLimit } from '../../utils/blogsPaginationInfo';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type Props = WithDictionary & {
 serverBlogs: Blog[];
};

export default function Articles({ dic, serverBlogs }: Props) {
 const filtersRef = useRef<HTMLDivElement>(null);
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const { locale } = useAppConfig();
 const searchText = searchParams.get('searchText');
 const [rowsCount, setRowsCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 1,
  pageSize: paginationLimit,
 });
 const filtersUseForm = useForm<BlogFilters>({
  resolver: zodResolver(blogFiltersSchema),
  defaultValues: {
   search: searchText || '',
   category: null,
  },
 });
 const searchValue = filtersUseForm.watch('search');
 const blogCategory = filtersUseForm.watch('category');
 const dbSearchValue = useDebounceValue(searchValue, 200);

 const {
  data: blogCategories = [],
  isLoading: blogCategoriesLoading,
  isFetching: blogCategoriesFetching,
 } = useQuery({
  queryKey: ['blogCategories'],
  async queryFn() {
   const result = await getBlogCategories({
    locale,
   });
   const data = result.data.payload.BlogCategories;
   return data;
  },
 });

 const {
  data: blogs = serverBlogs,
  isLoading: blogsLoading,
  isFetching: blogsFetching,
 } = useQuery({
  initialData: serverBlogs,
  queryKey: [
   'blogs',
   dbSearchValue,
   blogCategory?.id,
   pagination.page,
   pagination.pageSize,
  ],
  async queryFn() {
   const result = await getBlogs({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page,
    },
    searchText: dbSearchValue,
    blogStateID: 2,
    blogCategoryID: blogCategory ? Number(blogCategory.id) : undefined,
   });
   const pacakge = result.data.payload.Blogs;
   const data = pacakge.rows;
   setRowsCount(pacakge.rowsCount);
   return data;
  },
 });

 useEffect(() => {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set('categoryID', blogCategory?.id || '');
  newSearchParams.set('categoryName', blogCategory?.name || '');
  if (pagination.page) newSearchParams.set('page', pagination.page.toString());
  router.replace(`${pathname}?${newSearchParams.toString()}`, {
   scroll: false,
  });
 }, [
  pathname,
  router,
  dbSearchValue,
  blogCategory,
  pagination.page,
  searchParams,
 ]);

 useEffect(() => {
  const categoryID = searchParams.get('categoryID');
  const categoryName = searchParams.get('categoryName');
  const page = searchParams.get('page');
  filtersUseForm.setValue(
   'category',
   categoryID && categoryName ? { id: categoryID, name: categoryName } : null
  );
  if (page) setPagination((prev) => ({ ...prev, page: Number(page) }));
 }, [searchParams, filtersUseForm]);

 return (
  <FormProvider {...filtersUseForm}>
   <section>
    <ArticleFilters
     dic={dic}
     filtersRef={filtersRef}
     ref={filtersRef}
     blogCategories={blogCategories}
     isLoadingBlogCategory={blogCategoriesLoading || blogCategoriesFetching}
    />
    <ArticlesList
     dic={dic}
     blogs={blogs}
     isLoadingBlogs={blogsLoading || blogsFetching}
    />
    {rowsCount > paginationLimit && (
     <div className='flex justify-center mb-8 text-lg font-medium'>
      <Pagination
       size='large'
       count={Math.ceil(rowsCount / pagination.pageSize)}
       shape='rounded'
       color='secondary'
       page={pagination.page}
       onChange={(_, value) => {
        setPagination({ ...pagination, page: value });
       }}
       sx={{
        '& .MuiButtonBase-root': {
         fontSize: 'inherit',
        },
       }}
      />
     </div>
    )}
   </section>
  </FormProvider>
 );
}
