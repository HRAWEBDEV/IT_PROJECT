import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
} from '@mui/x-data-grid';
import {
 type User,
 changeUserState,
} from '@/services/api-actions/globalApiActions';
import CheckIcon from '@mui/icons-material/Check';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConfirmBox from '@/components/ConfirmBox';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useAccessContext } from '../../../services/access/accessContext';
import { useAppConfig } from '@/services/app-config/appConfig';

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
 selectedUser,
 setShowUserRole,
}: Props) {
 const { locale } = useAppConfig();
 const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
 });
 const { roleAccess } = useAccessContext();
 const queryClient = useQueryClient();
 const [openConfirmBox, setOpenConfirmBox] = useState(false);
 const [stateAction, setStateAction] = useState<'blackList' | 'disabled'>(
  'blackList'
 );
 const {
  users,
  actionConfirmMessage,
  changesSavedSuccessfully,
  errorTryAgainLater,
 } = useWebsiteDictionary() as {
  users: Dic;
  actionConfirmMessage: string;
  changesSavedSuccessfully: string;
  errorTryAgainLater: string;
 };

 const { mutate: changeUserStateMutate, isPending: isChangingUserState } =
  useMutation({
   mutationFn({
    disabled,
    blackList,
   }: {
    disabled?: boolean;
    blackList?: boolean;
   }) {
    return changeUserState({
     userID: selectedUser!.personID,
     disabled,
     blackList,
    });
   },
   onSuccess() {
    enqueueSnackbar({
     message: changesSavedSuccessfully,
     variant: 'success',
    });
    setOpenConfirmBox(false);
    setSelectedUser(null);
    queryClient.invalidateQueries({
     queryKey: ['dashboard', 'users'],
    });
   },
   onError(err: AxiosError) {
    enqueueSnackbar({
     message: (err.response?.data as string) || errorTryAgainLater,
     variant: 'error',
    });
   },
  });

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
      field: 'createDateTimeOffset',
      headerName: users.loginDate as string,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      valueFormatter(value) {
       return dateFormatter.format(new Date(value));
      },
     },
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
      field: 'cellPhone',
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
      getActions({ row }) {
       const actions = [];
       if (roleAccess.update) {
        actions.push(
         <GridActionsCellItem
          key={'edit'}
          label={users.access as string}
          icon={<ManageAccountsIcon color='warning' />}
          onClick={() => {
           setSelectedUser(row as User);
           setShowUserRole(true);
          }}
          showInMenu
         />
        );
       }
       if (roleAccess.changeState) {
        actions.push(
         <GridActionsCellItem
          disabled={isChangingUserState}
          key={'blackList'}
          label={users.blackList as string}
          onClick={() => {
           setStateAction('blackList');
           setOpenConfirmBox(true);
           setSelectedUser(row as User);
          }}
          icon={
           !row.blackList ? (
            <ToggleOffIcon color='error' />
           ) : (
            <ToggleOnIcon color='success' />
           )
          }
          showInMenu
         />,
         <GridActionsCellItem
          disabled={isChangingUserState}
          key={'disabled'}
          label={users.disabled as string}
          onClick={() => {
           setStateAction('disabled');
           setOpenConfirmBox(true);
           setSelectedUser(row as User);
          }}
          icon={
           !row.disabled ? (
            <ToggleOffIcon color='error' />
           ) : (
            <ToggleOnIcon color='success' />
           )
          }
          showInMenu
         />
        );
       }
       return actions;
      },
     },
    ]}
   />
   <ConfirmBox
    open={openConfirmBox}
    message={actionConfirmMessage}
    onCancel={() => {
     setOpenConfirmBox(false);
     setSelectedUser(null);
    }}
    onConfirm={() => {
     if (stateAction === 'disabled') {
      changeUserStateMutate({ disabled: !selectedUser!.disabled });
     } else {
      changeUserStateMutate({ blackList: !selectedUser!.blackList });
     }
    }}
   />
  </div>
 );
}
