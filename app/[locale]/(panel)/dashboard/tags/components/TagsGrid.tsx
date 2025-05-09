import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
 GridFilterModel,
} from '@mui/x-data-grid';
import { type Tag, deleteTag } from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ConfirmBox from '@/components/ConfirmBox';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

type Props = {
 tagsList: Tag[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 filterModel: GridFilterModel;
 setFilterModel: (filterModel: GridFilterModel) => void;
 selectedTag: Tag | null;
 setSelectedTag: (tag: Tag | null) => void;
 setOpenAddTag: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 rowCount: number;
};

export default function TagsGrid({
 tagsList,
 isLoading,
 pagination,
 setPagination,
 rowCount,
 setSelectedTag,
 setOpenAddTag,
 selectedTag,
 filterModel,
 setFilterModel,
}: Props) {
 const {
  tags,
  deleteItemConfirmation,
  changesSavedSuccessfully,
  errorTryAgainLater,
 } = useWebsiteDictionary() as {
  tags: Dic;
  deleteItemConfirmation: string;
  changesSavedSuccessfully: string;
  errorTryAgainLater: string;
 };
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
 const { enqueueSnackbar } = useSnackbar();
 const [openConfirm, setOpenConfirm] = useState(false);
 const { mutate: deleteMutate, isPending } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'tags'],
   });
   enqueueSnackbar({
    variant: 'success',
    message: changesSavedSuccessfully,
   });
   setOpenConfirm(false);
   setSelectedTag(null);
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
  mutationFn(id: number) {
   return deleteTag({
    tagID: id,
    locale,
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
    showToolbar
    disableColumnMenu
    disableColumnSelector
    disableDensitySelector
    disableColumnFilter
    disableColumnSorting
    filterModel={filterModel}
    onFilterModelChange={setFilterModel}
    filterMode='server'
    slotProps={{
     toolbar: {
      printOptions: {
       disableToolbarButton: true,
      },
      csvOptions: {
       disableToolbarButton: true,
      },
     },
    }}
    loading={isLoading || isPending}
    paginationModel={pagination}
    onPaginationModelChange={setPagination}
    rowCount={rowCount}
    paginationMode='server'
    rows={tagsList}
    columns={[
     {
      field: 'name',
      headerName: tags.tagTitle as string,
      minWidth: 250,
      flex: 1,
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      headerName: tags.actions as string,
      getActions({ row }) {
       return [
        <GridActionsCellItem
         key={'edit'}
         label={tags.editTag as string}
         icon={<EditIcon color='secondary' />}
         onClick={() => {
          setSelectedTag(row);
          setOpenAddTag();
         }}
         showInMenu
        />,
        <GridActionsCellItem
         key={'remove'}
         disabled={isPending}
         label={tags.deleteTag as string}
         icon={<DeleteIcon color='error' />}
         onClick={() => {
          setSelectedTag(row);
          setOpenConfirm(true);
         }}
         showInMenu
        />,
       ];
      },
     },
    ]}
   />
   <ConfirmBox
    message={deleteItemConfirmation as string}
    open={openConfirm}
    onConfirm={async () => {
     if (!selectedTag) return;
     deleteMutate(selectedTag.id);
    }}
    onCancel={() => {
     setOpenConfirm(false);
     setSelectedTag(null);
    }}
   />
  </div>
 );
}
