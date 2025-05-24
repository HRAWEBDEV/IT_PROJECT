'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type ContactUsFiltersSchema,
 contactUsFiltersSchema,
} from '../../schemas/contactUsFilters';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import {
 ContactUs,
 getContactUs,
} from '@/services/api-actions/globalApiActions';
import { useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import ContactUsFilters from './ContactUsFilters';
import ContactUsGrid from './ContactUsGrid';
import { useAccessContext } from '../../../services/access/accessContext';
import NoAccessGranted from '../../../components/NoAccessGranted';

export default function ContactUsWrapper() {
 const { roleAccess } = useAccessContext();
 const [openContactUsInfo, setOpenContactUsInfo] = useState(false);
 const [selectedContactUs, setSelectedContactUs] = useState<ContactUs | null>(
  null
 );
 //
 const filtersUseForm = useForm<ContactUsFiltersSchema>({
  resolver: zodResolver(contactUsFiltersSchema),
  defaultValues: {
   search: '',
   isRead: false,
   deleted: false,
  },
 });
 const [search, isRead, deleted] = filtersUseForm.watch([
  'search',
  'isRead',
  'deleted',
 ]);
 const debouncedSearch = useDebounceValue(search, 300);
 //
 const [rowsCount, setRowsCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 //
 const { locale } = useAppConfig();
 //
 const { initialInfo, noItemsFound } = useWebsiteDictionary() as {
  initialInfo: Dic;
  noItemsFound: string;
 };
 //
 const { data: contactUsList = [], isLoading } = useQuery({
  queryKey: [
   'dashboard',
   'contactUs',
   debouncedSearch,
   pagination.page,
   isRead,
   deleted,
  ],
  async queryFn({ signal }) {
   const res = await getContactUs({
    locale,
    signal,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    searchText: debouncedSearch,
    isRead,
    deleted,
   }).then((res) => res.data.payload.ContactUs);
   setRowsCount(res.rowsCount);
   return res.rows;
  },
 });

 return (
  <>
   {roleAccess.read && (
    <section className='mb-8'>
     <h2 className='font-bold text-2xl mb-4'>
      {initialInfo.contactUs as string}
     </h2>
     <FormProvider {...filtersUseForm}>
      <ContactUsFilters test='test' />
     </FormProvider>
     {contactUsList.length > 0 ? (
      <ContactUsGrid
       contactUsList={contactUsList}
       isLoading={isLoading}
       pagination={pagination}
       setPagination={setPagination}
       rowsCount={rowsCount}
       selectedContactUs={selectedContactUs}
       setSelectedContactUs={setSelectedContactUs}
       setOpenContactUsInfo={() => setOpenContactUsInfo(true)}
      />
     ) : (
      <div className='bg-background rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 min-h-[18rem] flex items-center justify-center flex-col'>
       <p className='text-center font-medium text-neutral-500 dark:text-neutral-400 text-lg'>
        {noItemsFound as string}
       </p>
      </div>
     )}
    </section>
   )}
  </>
 );
}
