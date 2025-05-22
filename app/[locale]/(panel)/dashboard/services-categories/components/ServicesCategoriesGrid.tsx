import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
 GridFilterModel,
} from '@mui/x-data-grid';
import {
 type ServiceCategory,
 deleteServiceCategory,
} from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ConfirmBox from '@/components/ConfirmBox';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useAccessContext } from '../../services/access/accessContext';

type Props = {
 categoriesList: ServiceCategory[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 selectedCategory: ServiceCategory | null;
 setSelectedCategory: (category: ServiceCategory | null) => void;
 setOpenAddCategory: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 rowCount: number;
 filterModel: GridFilterModel;
 setFilterModel: (filterModel: GridFilterModel) => void;
};

export default function ServicesCategoriesGrid({
 isLoading,
 pagination,
 setPagination,
 rowCount,
 setSelectedCategory,
 setOpenAddCategory,
 selectedCategory,
 categoriesList,
 filterModel,
 setFilterModel,
}: Props) {
 const { roleAccess } = useAccessContext();
 const {
  servicesCategories,
  deleteItemConfirmation,
  errorTryAgainLater,
  changesSavedSuccessfully,
 } = useWebsiteDictionary() as {
  servicesCategories: Dic;
  deleteItemConfirmation: string;
  errorTryAgainLater: string;
  changesSavedSuccessfully: string;
 };
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
 const { enqueueSnackbar } = useSnackbar();
 const [openConfirm, setOpenConfirm] = useState(false);
 const { mutate: deleteMutate, isPending } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['services', 'servicesCategories'],
   });
   enqueueSnackbar({
    message: changesSavedSuccessfully,
    variant: 'success',
   });
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
  mutationFn(id: number) {
   return deleteServiceCategory({
    locale,
    serviceCategoryID: id,
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
    filterMode='server'
    filterModel={filterModel}
    onFilterModelChange={setFilterModel}
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
    rows={categoriesList}
    columns={[
     {
      field: 'name',
      headerName: servicesCategories.categoryTitle as string,
      minWidth: 250,
      flex: 1,
     },
     {
      field: 'description',
      headerName: servicesCategories.description as string,
      minWidth: 320,
      flex: 3,
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      headerName: servicesCategories.actions as string,
      getActions({ row }) {
       const actions = [];
       if (roleAccess.update) {
        actions.push(
         <GridActionsCellItem
          key={'edit'}
          label={servicesCategories.editCategory as string}
          icon={<EditIcon color='secondary' />}
          onClick={() => {
           setSelectedCategory(row);
           setOpenAddCategory();
          }}
          showInMenu
         />
        );
       }
       if (roleAccess.remove) {
        actions.push(
         <GridActionsCellItem
          key={'remove'}
          disabled={isPending}
          label={servicesCategories.deleteCategory as string}
          icon={<DeleteIcon color='error' />}
          onClick={() => {
           setSelectedCategory(row);
           setOpenConfirm(true);
          }}
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
    message={deleteItemConfirmation as string}
    open={openConfirm}
    onConfirm={async () => {
     if (!selectedCategory) return;
     deleteMutate(selectedCategory.id);
     setOpenConfirm(false);
     setSelectedCategory(null);
    }}
    onCancel={() => {
     setOpenConfirm(false);
     setSelectedCategory(null);
    }}
   />
  </div>
 );
}
