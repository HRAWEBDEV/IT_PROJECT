import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
} from '@mui/x-data-grid';
import { type Blog } from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ConfirmBox from '@/components/ConfirmBox';
import { useSnackbar } from 'notistack';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArticleIcon from '@mui/icons-material/Article';

type Props = {
 articlesList: Blog[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 selectedArticle: Blog | null;
 setSelectedArticle: (article: Blog | null) => void;
 setOpenAddArticle: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 setShowAddImage: (show: boolean) => void;
 rowCount: number;
};

export default function ArticlesGrid({
 articlesList,
 isLoading,
 pagination,
 setPagination,
 rowCount,
 setSelectedArticle,
 setOpenAddArticle,
 setShowAddImage,
 selectedArticle,
}: Props) {
 // const queryClient = useQueryClient();
 // const { locale } = useAppConfig();
 // const { enqueueSnackbar } = useSnackbar();
 const [openConfirm, setOpenConfirm] = useState(false);
 const { mutate: deleteMutate, isPending } = useMutation({});

 const { articles, deleteItemConfirmation } = useWebsiteDictionary() as {
  articles: Dic;
  deleteItemConfirmation: string;
 };
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
    rows={articlesList}
    columns={[
     {
      field: 'header',
      headerName: articles.articleTitle as string,
      minWidth: 250,
      flex: 1,
     },
     {
      field: 'description',
      headerName: articles.description as string,
      minWidth: 350,
      flex: 3,
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      headerName: articles.actions as string,
      getActions({ row }) {
       return [
        <GridActionsCellItem
         key={'edit'}
         label={articles.editArticle as string}
         icon={<EditIcon color='secondary' />}
         onClick={() => {
          setSelectedArticle(row);
          setOpenAddArticle();
         }}
         showInMenu
        />,
        <GridActionsCellItem
         key={'images'}
         label={articles.images as string}
         icon={<ImageOutlinedIcon color='warning' />}
         onClick={() => {
          setSelectedArticle(row);
          setShowAddImage(true);
         }}
         showInMenu
        />,
        <GridActionsCellItem
         key={'content'}
         label={articles.content as string}
         icon={<ArticleIcon color='primary' />}
         onClick={() => {
          setSelectedArticle(row);
          setShowAddImage(true);
         }}
         showInMenu
        />,
        <GridActionsCellItem
         key={'remove'}
         disabled={isPending}
         label={articles.deleteArticle as string}
         icon={<DeleteIcon color='error' />}
         onClick={() => {
          setSelectedArticle(row);
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
     if (!selectedArticle) return;
     //  deleteMutate(selectedArticle.id);
     setOpenConfirm(false);
     setSelectedArticle(null);
    }}
    onCancel={() => {
     setOpenConfirm(false);
     setSelectedArticle(null);
    }}
   />
  </div>
 );
}
