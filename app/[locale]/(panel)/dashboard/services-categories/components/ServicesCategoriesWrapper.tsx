'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 ServiceCategory,
 getServiceCategories,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ServicesCategoriesGrid from './ServicesCategoriesGrid';
import { GridPaginationModel, GridFilterModel } from '@mui/x-data-grid';
import ServicesCategoriesFilters from './ServicesCategoriesFilters';
import AddServiceCategory from './AddServiceCategory';
import { useAccessContext } from '../../services/access/accessContext';
import NoAccessGranted from '../../components/NoAccessGranted';

export default function ServicesCategoriesWrapper() {
 const { roleAccess } = useAccessContext();
 const [filterModel, setFilterModel] = useState<GridFilterModel>({
  items: [],
 });
 const [openEditCategory, setOpenEditCategory] = useState(false);
 const [selectedCategory, setSelectedCategory] =
  useState<ServiceCategory | null>(null);
 const [rowCount, setRowCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 //
 const { locale } = useAppConfig();
 const { servicesCategories } = useWebsiteDictionary() as {
  servicesCategories: Dic;
 };

 const {
  data: categoriesList = [],
  isLoading,
  isFetching,
 } = useQuery({
  queryKey: [
   'dashboard',
   'servicesCategories',
   pagination.page + 1,
   pagination.pageSize,
   filterModel?.quickFilterValues?.[0] || '',
  ],
  async queryFn() {
   const result = await getServiceCategories({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    searchText: filterModel?.quickFilterValues?.[0] || undefined,
   });
   const pacakge = result.data.payload.ServiceCategories;
   const data = pacakge.rows;
   setRowCount(pacakge.rowsCount);
   return data;
  },
 });

 return (
  <>
   {true ? (
    <div>
     <h1 className='font-bold text-2xl mb-4'>
      {servicesCategories.title as string}
     </h1>
     <ServicesCategoriesFilters
      setOpenAddCategory={() => setOpenEditCategory(true)}
     />
     <ServicesCategoriesGrid
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
     <AddServiceCategory
      open={openEditCategory}
      category={selectedCategory}
      onClose={() => {
       setOpenEditCategory(false);
       setSelectedCategory(null);
      }}
     />
    </div>
   ) : (
    <NoAccessGranted />
   )}
  </>
 );
}
