'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { locales, type Dic } from '@/localization/locales';
import CategoriesGrid from './CategoriesGrid';
import { useQuery } from '@tanstack/react-query';
import { getBlogCategories } from '@/services/api-actions/globalApiActions';
import { type GridPaginationModel } from '@mui/x-data-grid';
import { useAppConfig } from '@/services/app-config/appConfig';

export default function CategoriesWrapper() {
 const { locale } = useAppConfig();
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 15,
 });
 const [rowsCount, setRowsCount] = useState<number>(0);
 const { news } = useWebsiteDictionary() as {
  news: Dic;
 };

 const {
  isLoading,
  isFetching,
  data = [],
  isError,
 } = useQuery({
  queryKey: ['get-blog-categories', locale, pagination.page],
  async queryFn({ signal }) {
   const { data } = await getBlogCategories({
    signal,
    locale,
    pagination: {
     offset: pagination.page + 1,
     limit: pagination.pageSize,
    },
   });
   const categories = data.payload.BlogCategories;
   setRowsCount(categories.rowsCount);
   return categories.rows;
  },
 });

 return (
  <section className='bg-background rounded-lg p-4 border border-neutral-300 dark:border-neutral-700'>
   <div className='mb-4'>
    <h3 className='font-medium text-base'>
     {(news.categories as Dic).title as string}
    </h3>
   </div>
   <CategoriesGrid
    pagination={pagination}
    onPaginationChange={setPagination}
    rowsCount={rowsCount}
    isLoading={isLoading || isFetching}
    blogCategories={data}
   />
  </section>
 );
}
