import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
} from '@mui/x-data-grid';
import { type User } from '@/services/api-actions/globalApiActions';
import CheckIcon from '@mui/icons-material/Check';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

type Props = {
 usersList: User[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 rowsCount: number;
 selectedUser: User | null;
 setShowUserRole: (showUserRole: boolean) => void;
 setSelectedUser: (selectedUser: User | null) => void;
 setPagination: (pagination: GridPaginationModel) => void;
};

export default function UsersGrid({
 usersList,
 isLoading,
 pagination,
 setPagination,
 rowsCount,
 setSelectedUser,
 setShowUserRole,
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
      headerName: users.userName as string,
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
     {
      field: 'verified',
      headerName: users.verfied as string,
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? <CheckIcon color='secondary' /> : '---';
      },
     },
     {
      field: 'blackList',
      headerName: users.blackList as string,
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? <CheckIcon color='error' /> : '---';
      },
     },
     {
      field: 'disabled',
      headerName: users.disabled as string,
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? <CheckIcon color='warning' /> : '---';
      },
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      headerName: users.actions as string,
      getActions({row}) {
       return [
        <GridActionsCellItem
         key={'edit'}
         label={users.access as string}
         icon={<ManageAccountsIcon color='warning' />}
         onClick={() => {
          setSelectedUser(row as User);
          setShowUserRole(true);
         }}
         showInMenu
        />,
        <GridActionsCellItem
         key={'edit'}
         label={users.changeState as string}
         icon={<ChangeCircleIcon color='error' />}
         showInMenu
        />,
       ];
      },
     },
    ]}
   />
  </div>
 );
}
