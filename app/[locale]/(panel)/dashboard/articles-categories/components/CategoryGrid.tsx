import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
 GridFilterModel,
} from '@mui/x-data-grid';
import {
 type BlogCategory,
 deleteBlogCategory,
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

type Props = {
 categoriesList: BlogCategory[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 selectedCategory: BlogCategory | null;
 setSelectedCategory: (category: BlogCategory | null) => void;
 setOpenAddCategory: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 rowCount: number;
 filterModel: GridFilterModel;
 setFilterModel: (filterModel: GridFilterModel) => void;
};

export default function CategoryGrid({
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
 const {
  articlesCategories,
  deleteItemConfirmation,
  errorTryAgainLater,
  changesSavedSuccessfully,
 } = useWebsiteDictionary() as {
  articlesCategories: Dic;
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
    queryKey: ['dashboard', 'articlesCategories'],
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
   return deleteBlogCategory({
    locale,
    blogCategoryID: id,
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
      headerName: articlesCategories.categoryTitle as string,
      minWidth: 250,
      flex: 1,
     },
     {
      field: 'description',
      headerName: articlesCategories.description as string,
      minWidth: 320,
      flex: 3,
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      headerName: articlesCategories.actions as string,
      getActions({ row }) {
       return [
        <GridActionsCellItem
         key={'edit'}
         label={articlesCategories.editCategory as string}
         icon={<EditIcon color='secondary' />}
         onClick={() => {
          setSelectedCategory(row);
          setOpenAddCategory();
         }}
         showInMenu
        />,
        <GridActionsCellItem
         key={'remove'}
         disabled={isPending}
         label={articlesCategories.deleteCategory as string}
         icon={<DeleteIcon color='error' />}
         onClick={() => {
          setSelectedCategory(row);
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
