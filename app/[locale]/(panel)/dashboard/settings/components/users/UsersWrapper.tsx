'use client';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import UsersGrid from './UsersGrid';
import UsersFilters from './UsersFilters';
import { getUsers, type User } from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useQuery } from '@tanstack/react-query';
import { GridPaginationModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type UsersFiltersSchema,
 usersFiltersSchema,
} from '../../schemas/usersFilters';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import UserRole from './UserRole';

export default function UsersWrapper() {
 const [showUserRole, setShowUserRole] = useState(false);
 const [selectedUser, setSelectedUser] = useState<User | null>(null);
 const usersFilters = useForm<UsersFiltersSchema>({
  resolver: zodResolver(usersFiltersSchema),
  defaultValues: {
   search: '',
   disabled: false,
   verified: false,
   blackList: false,
  },
 });
 //
 const [search, disabled, verified, blackList] = usersFilters.watch([
  'search',
  'disabled',
  'verified',
  'blackList',
 ]);
 //
 const [rowsCount, setRowsCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 const { locale } = useAppConfig();
 const { users, noItemsFound } = useWebsiteDictionary() as {
  users: Dic;
  noItemsFound: string;
 };
 const debouncedSearch = useDebounceValue(search, 300);

 const { data: usersList = [], isLoading } = useQuery({
  queryKey: [
   'users',
   pagination.page,
   debouncedSearch,
   disabled,
   verified,
   blackList,
  ],
  async queryFn({ signal }) {
   const usersPackage = await getUsers({
    locale,
    signal,
    blackList,
    disabled,
    searchText: debouncedSearch,
    verified,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
   }).then((res) => res.data.payload.Users);
   setRowsCount(usersPackage.rowsCount);
   return usersPackage.rows;
  },
 });

 return (
  <section>
   <h2 className='font-bold text-2xl mb-4'>{users.title as string}</h2>
   <FormProvider {...usersFilters}>
    <UsersFilters test='test' />
    {usersList.length > 0 ? (
     <UsersGrid
      usersList={usersList}
      isLoading={isLoading}
      pagination={pagination}
      setPagination={setPagination}
      rowsCount={rowsCount}
      selectedUser={selectedUser}
      setShowUserRole={setShowUserRole}
      setSelectedUser={setSelectedUser}
     />
    ) : (
     <div className='bg-background rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 min-h-[18rem] flex items-center justify-center flex-col'>
      <p className='text-center font-medium text-neutral-500 dark:text-neutral-400 text-lg'>
       {noItemsFound as string}
      </p>
     </div>
    )}
   </FormProvider>
   {showUserRole && selectedUser && (
    <UserRole
     open={showUserRole}
     user={selectedUser}
     onClose={() => setShowUserRole(false)}
    />
   )}
  </section>
 );
}
