import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { type User } from '@/services/api-actions/globalApiActions';

type Props = {
 usersList: User[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 rowsCount: number;
 setPagination: (pagination: GridPaginationModel) => void;
};

export default function UsersGrid({
 usersList,
 isLoading,
 pagination,
 setPagination,
 rowsCount,
}: Props) {
 const { users } = useWebsiteDictionary() as {
  users: Dic;
 };

 return (
  <div
   style={{
    height: '30rem',
   }}
  >
   <DataGrid
    autoPageSize
    filterMode='server'
    loading={isLoading}
    paginationModel={pagination}
    onPaginationModelChange={setPagination}
    rowCount={rowsCount}
    paginationMode='server'
    rows={usersList}
    getRowId={(row) => row.personID}
    columns={[
     {
      field: 'userName',
      headerName: users.username as string,
      minWidth: 150,
     },
     {
      field: 'firstName',
      headerName: users.firstname as string,
      flex: 1,
      minWidth: 200,
     },
     {
      field: 'lastName',
      headerName: users.lastname as string,
      flex: 1,
      minWidth: 220,
     },
     {
      field: 'email',
      headerName: users.email as string,
      minWidth: 250,
     },
     {
      field: 'phone',
      headerName: users.phone as string,
      minWidth: 250,
     },
    ]}
   />
  </div>
 );
}
