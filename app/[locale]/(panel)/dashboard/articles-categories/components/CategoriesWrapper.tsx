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
import CategoryGrid from './CategoryGrid';
import { GridPaginationModel, GridFilterModel } from '@mui/x-data-grid';
import CategoryFilters from './CategoryFilters';
import AddCategory from './AddCategory';

export default function CategoriesWrapper() {
 const [filterModel, setFilterModel] = useState<GridFilterModel>({
  items: [],
 });
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
   pagination.page + 1,
   pagination.pageSize,
   filterModel?.quickFilterValues?.[0] || '',
  ],
  async queryFn() {
   const result = await getBlogCategories({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    searchText: filterModel?.quickFilterValues?.[0] || undefined,
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
   <CategoryFilters setOpenAddCategory={() => setOpenEditCategory(true)} />
   <CategoryGrid
    categoriesList={categoriesList}
    filterModel={filterModel}
    setFilterModel={setFilterModel}
    isLoading={isLoading || isFetching}
    pagination={pagination}
    setPagination={setPagination}
    rowCount={rowCount}
    setOpenAddCategory={() => setOpenEditCategory(true)}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
   />
   <AddCategory
    open={openEditCategory}
    category={selectedCategory}
    onClose={() => {
     setOpenEditCategory(false);
     setSelectedCategory(null);
    }}
   />
  </div>
 );
}
