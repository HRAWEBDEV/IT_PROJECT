import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
} from '@mui/x-data-grid';
import { type ContactUs } from '@/services/api-actions/globalApiActions';
import CheckIcon from '@mui/icons-material/Check';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConfirmBox from '@/components/ConfirmBox';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { AxiosError } from 'axios';

type Props = {
 contactUsList: ContactUs[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 rowsCount: number;
 selectedContactUs: ContactUs | null;
 setSelectedContactUs: (selectedUser: ContactUs | null) => void;
 setPagination: (pagination: GridPaginationModel) => void;
};

export default function UsersGrid({
 contactUsList,
 isLoading,
 pagination,
 setPagination,
 rowsCount,
 setSelectedContactUs,
 selectedContactUs,
}: Props) {
 const queryClient = useQueryClient();
 const [openConfirmBox, setOpenConfirmBox] = useState(false);
 const [stateAction, setStateAction] = useState<'blackList' | 'disabled'>(
  'blackList'
 );
 const {
  initialInfo,
  actionConfirmMessage,
  changesSavedSuccessfully,
  errorTryAgainLater,
 } = useWebsiteDictionary() as {
  initialInfo: Dic;
  actionConfirmMessage: string;
  changesSavedSuccessfully: string;
  errorTryAgainLater: string;
 };

 const { mutate: changeUserStateMutate, isPending: isChangingUserState } =
  useMutation({
   mutationFn() {
    return Promise.resolve();
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
    rows={contactUsList}
    columns={[
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      getActions() {
       return [];
      },
     },
    ]}
   />
   <ConfirmBox
    open={openConfirmBox}
    message={actionConfirmMessage}
    onCancel={() => {}}
    onConfirm={() => {}}
   />
  </div>
 );
}
