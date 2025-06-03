'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import ServicesFilters from './ServicesFilters';
import {
 type Service,
 getServices,
 getServiceCategories,
 getServiceStates,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ServicesGrid from './ServicesGrid';
import { type FilterSchema, filtersSchema } from '../schemas/filtersSchema';
import { GridPaginationModel, GridFilterModel } from '@mui/x-data-grid';
import AddService from './AddService';
import AddCategory from '../../services-categories/components/AddServiceCategory';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddContent from './AddContent';
import ChangeState from './ChangeState';
import { useAccessContext } from '../../services/access/accessContext';
import NoAccessGranted from '../../components/NoAccessGranted';
import AddImage from './AddImage';

export default function ArticlesWrapper() {
 const { roleAccess } = useAccessContext();
 const [filterModel, setFilterModel] = useState<GridFilterModel>({
  items: [],
 });
 const [openAddImage, setOpenAddImage] = useState(false);
 const [openChangeState, setOpenChangeState] = useState(false);
 const [openServiceContent, setOpenServiceContent] = useState(false);
 const [openAddCategory, setOpenAddCategory] = useState(false);
 const [openEditService, setOpenEditService] = useState(false);
 const [selectedService, setSelectedService] = useState<Service | null>(null);
 const [rowCount, setRowCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 const filtersUseForm = useForm<FilterSchema>({
  resolver: zodResolver(filtersSchema),
 });
 const { watch } = filtersUseForm;
 const [serviceCategory, serviceState] = watch(['category', 'state']);
 //
 const { locale } = useAppConfig();
 const { services } = useWebsiteDictionary() as {
  services: Dic;
 };

 const {
  data: serviceCategories = [],
  isLoading: isServiceCategoriesLoading,
  isFetching: isServiceCategoriesFetching,
 } = useQuery({
  queryKey: ['dashboard', 'servicesCategories'],
  async queryFn() {
   const result = await getServiceCategories({
    locale,
   });
   const data = result.data.payload.ServiceCategories;
   return data;
  },
 });

 const {
  data: serviceStates = [],
  isLoading: isServiceStatesLoading,
  isFetching: isServiceStatesFetching,
 } = useQuery({
  queryKey: ['dashboard', 'servicesStates'],
  async queryFn() {
   const result = await getServiceStates({
    locale,
   });
   const data = result.data;
   if (data.length && !serviceState) {
    filtersUseForm.setValue('state', {
     id: data[0].id.toString(),
     name: data[0].name,
    });
   }
   return data;
  },
 });

 const {
  data: servicesList = [],
  isLoading,
  isFetching,
 } = useQuery({
  enabled: !!filtersUseForm.getValues('state'),
  queryKey: [
   'dashboard',
   'services',
   pagination.page + 1,
   pagination.pageSize,
   serviceCategory?.id || '',
   serviceState?.id || '',
   filterModel?.quickFilterValues?.[0] || '',
  ],
  async queryFn() {
   const serviceCategory = filtersUseForm.getValues('category');
   const serviceState = filtersUseForm.getValues('state');
   const result = await getServices({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    serviceStateID: Number(serviceState.id),
    serviceCategoryID: serviceCategory ? Number(serviceCategory.id) : undefined,
    searchText: filterModel?.quickFilterValues?.[0] || undefined,
    showForCards: false,
   });
   const pacakge = result.data.payload.Services;
   const data = pacakge.rows;
   setRowCount(pacakge.rowsCount);
   return data;
  },
 });

 return (
  <>
   {roleAccess.read ? (
    <div>
     <h1 className='font-bold text-2xl mb-4'>{services.title as string}</h1>
     <FormProvider {...filtersUseForm}>
      <ServicesFilters
       serviceCategories={serviceCategories}
       serviceStates={serviceStates}
       isLoadingCategories={
        isServiceCategoriesLoading || isServiceCategoriesFetching
       }
       isLoadingStates={isServiceStatesLoading || isServiceStatesFetching}
       setOpenAddService={() => setOpenEditService(true)}
       setOpenAddCategory={() => setOpenAddCategory(true)}
      />
      {serviceCategories.length ? (
       <ServicesGrid
        servicesList={servicesList}
        isLoading={isLoading || isFetching}
        pagination={pagination}
        setOpenAddImage={() => setOpenAddImage(true)}
        setPagination={setPagination}
        rowCount={rowCount}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setOpenAddService={() => setOpenEditService(true)}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        setOpenServiceContent={() => setOpenServiceContent(true)}
        setOpenChangeState={() => setOpenChangeState(true)}
       />
      ) : (
       <div className='bg-background rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 min-h-[18rem] flex items-center justify-center flex-col'>
        <p className='text-center font-medium text-neutral-500 dark:text-neutral-400 text-lg'>
         {services.atLeastOneCategory as string}
        </p>
        <IconButton
         color='secondary'
         onClick={() => setOpenAddCategory(true)}
         className='absolute top-2 right-2'
        >
         <AddBoxOutlinedIcon sx={{ fontSize: '3rem' }} />
        </IconButton>
       </div>
      )}
     </FormProvider>
     {openEditService && (
      <AddService
       open={openEditService}
       service={selectedService}
       serviceCategories={serviceCategories}
       defaultCategory={serviceCategory}
       onClose={() => {
        setOpenEditService(false);
        setSelectedService(null);
       }}
      />
     )}
     <AddCategory
      open={openAddCategory}
      category={null}
      onClose={() => {
       setOpenAddCategory(false);
      }}
     />
     {openServiceContent && selectedService && (
      <AddContent
       open={openServiceContent}
       onClose={() => {
        setOpenServiceContent(false);
        setSelectedService(null);
       }}
       service={selectedService}
      />
     )}
     {openChangeState && selectedService && (
      <ChangeState
       open={openChangeState}
       onClose={() => {
        setSelectedService(null);
        setOpenChangeState(false);
       }}
       service={selectedService}
       serviceStates={serviceStates}
      />
     )}
     {openAddImage && selectedService && (
      <AddImage
       open={openAddImage}
       onClose={() => {
        setOpenAddImage(false);
        setSelectedService(null);
       }}
       service={selectedService}
      />
     )}
    </div>
   ) : (
    <NoAccessGranted />
   )}
  </>
 );
}
