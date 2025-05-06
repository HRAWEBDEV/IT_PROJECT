'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 BlogCategory,
 getBlogCategories,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import TagsGrid from './TagsGrid';
import { GridPaginationModel } from '@mui/x-data-grid';
// import AddTag from './AddTag';

export default function TagsWrapper() {
 const [openEditCategory, setOpenEditCategory] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(
  null
 );
 const [rowCount, setRowCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 //
 const { locale } = useAppConfig();
 const { articlesCategories } = useWebsiteDictionary() as {
  articlesCategories: Dic;
 };

 const {
  data: categoriesList = [],
  isLoading,
  isFetching,
 } = useQuery({
  queryKey: [
   'dashboard',
   'articlesCategories',
   pagination.page,
   pagination.pageSize,
  ],
  async queryFn() {
   const result = await getBlogCategories({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page,
    },
   });
   const pacakge = result.data.payload.BlogCategories;
   const data = pacakge.rows;
   setRowCount(pacakge.rowsCount);
   return data;
  },
 });

 return (
  <div>
   <h1 className='font-bold text-2xl mb-4'>
    {articlesCategories.title as string}
   </h1>
   <TagsGrid
    categoriesList={categoriesList}
    isLoading={isLoading || isFetching}
    pagination={pagination}
    setPagination={setPagination}
    rowCount={rowCount}
    setOpenAddCategory={() => setOpenEditCategory(true)}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
   />
   {/* <AddTag
    open={openEditTag}
    tag={selectedTag}
    tagCategories={tagCategories}
    onClose={() => {
     setOpenEditTag(false);
     setSelectedTag(null);
    }}
   /> */}
  </div>
 );
}
