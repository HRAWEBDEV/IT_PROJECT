import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
} from '@mui/x-data-grid';
import { type ContactUs } from '@/services/api-actions/globalApiActions';
import CheckIcon from '@mui/icons-material/Check';
import ConfirmBox from '@/components/ConfirmBox';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { readContactUs } from '@/services/api-actions/globalApiActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
 contactUsList: ContactUs[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 rowsCount: number;
 selectedContactUs: ContactUs | null;
 setSelectedContactUs: (selectedUser: ContactUs | null) => void;
 setOpenContactUsInfo: (open: boolean) => void;
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

 const { mutate: changeContactUsState, isPending: isChangingContactUsState } =
  useMutation({
   mutationFn({ contactUsID }: { contactUsID: number }) {
    return readContactUs(contactUsID);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: ['dashboard', 'contactUs'],
    });
    enqueueSnackbar({
     variant: 'success',
     message: changesSavedSuccessfully,
    });
    setOpenConfirmBox(false);
    setSelectedContactUs(null);
   },
   onError(err: AxiosError) {
    enqueueSnackbar({
     variant: 'error',
     message: (err.response?.data as string) || errorTryAgainLater,
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
    rows={contactUsList}
    columns={[
     {
      field: 'firstName',
      headerName: initialInfo.firstName as string,
      minWidth: 200,
     },
     {
      field: 'lastName',
      headerName: initialInfo.lastName as string,
      minWidth: 250,
     },
     {
      field: 'email',
      headerName: initialInfo.email as string,
      minWidth: 250,
     },
     {
      field: 'cellPhone',
      headerName: initialInfo.cellPhone as string,
      minWidth: 250,
     },
     {
      field: 'isRead',
      headerName: initialInfo.isRead as string,
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? <CheckIcon color='success' /> : '----';
      },
     },
     {
      field: 'deleted',
      headerName: initialInfo.deleted as string,
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? <CheckIcon color='success' /> : '----';
      },
     },
     {
      field: 'description',
      headerName: initialInfo.description as string,
      minWidth: 200,
      flex: 1,
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      getActions({ row }) {
       return [
        <GridActionsCellItem
         key='showInfo'
         label={initialInfo.showInfo as string}
         onClick={() => {
          setSelectedContactUs(row);
          setOpenContactUsInfo(true);
         }}
         icon={<VisibilityIcon color='primary' />}
        />,
        <GridActionsCellItem
         key='isRead'
         label={
          row.isRead
           ? (initialInfo.isRead as string)
           : (initialInfo.isNotRead as string)
         }
         onClick={() => {}}
         icon={
          row.isRead ? (
           <MarkEmailReadIcon color='success' />
          ) : (
           <MarkEmailReadIcon color='error' />
          )
         }
        />,
       ];
      },
     },
    ]}
   />
   <ConfirmBox
    open={openConfirmBox}
    message={actionConfirmMessage}
    onCancel={() => {
     setOpenConfirmBox(false);
     setSelectedContactUs(null);
    }}
    onConfirm={() => {
     if (selectedContactUs) {
      changeContactUsState({ contactUsID: selectedContactUs.id });
     }
    }}
   />
  </div>
 );
}
