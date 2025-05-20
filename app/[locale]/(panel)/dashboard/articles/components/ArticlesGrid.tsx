import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
 GridFilterModel,
} from '@mui/x-data-grid';
import { type Blog, patchBlog } from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ConfirmBox from '@/components/ConfirmBox';
import { useSnackbar } from 'notistack';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import { AxiosError } from 'axios';
import { useAccessContext } from '../../services/access/accessContext';

type Props = {
 articlesList: Blog[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 filterModel: GridFilterModel;
 setFilterModel: (filterModel: GridFilterModel) => void;
 selectedArticle: Blog | null;
 setSelectedArticle: (article: Blog | null) => void;
 setOpenAddArticle: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 setShowAddImage: (show: boolean) => void;
 setOpenArticleContent: () => void;
 setOpenChangeState: () => void;
 setOpenArticleComments: () => void;
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
 setOpenArticleContent,
 setOpenChangeState,
 setOpenArticleComments,
 filterModel,
 setFilterModel,
}: Props) {
 const { roleAccess } = useAccessContext();
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
 const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
 });
 const { enqueueSnackbar } = useSnackbar();
 const [openConfirm, setOpenConfirm] = useState(false);
 const {
  articles,
  deleteItemConfirmation,
  errorTryAgainLater,
  changesSavedSuccessfully,
 } = useWebsiteDictionary() as {
  articles: Dic;
  deleteItemConfirmation: string;
  errorTryAgainLater: string;
  changesSavedSuccessfully: string;
 };

 const { mutate: mutatePreview, isPending: isPendingPreview } = useMutation({
  async mutationFn(blog: Blog) {
   return patchBlog({
    blogID: blog.id,
    isFour: !blog.showForCard,
    locale,
   });
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'articles'],
   });
   enqueueSnackbar({
    message: changesSavedSuccessfully as string,
    variant: 'success',
   });
  },
  onError(error: AxiosError) {
   enqueueSnackbar({
    message: (error.response?.data as string) || errorTryAgainLater,
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
    loading={isLoading || isPendingPreview}
    paginationModel={pagination}
    onPaginationModelChange={setPagination}
    rowCount={rowCount}
    paginationMode='server'
    rows={articlesList}
    columns={[
     {
      field: 'createDateTimeOffset',
      headerName: articles.createDateTime as string,
      width: 140,
      headerAlign: 'center',
      align: 'center',
      valueFormatter(value) {
       return value && dateTimeFormatter.format(new Date(value));
      },
     },
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
      field: 'blogStateName',
      headerName: articles.state as string,
      minWidth: 120,
     },
     {
      field: 'showForCard',
      headerName: '',
      width: 10,
      renderCell({ row }) {
       return (
        <div className='text-center'>
         <StarIcon color={row.showForCard ? 'warning' : 'disabled'} />
        </div>
       );
      },
     },
     {
      type: 'actions',
      field: 'actions',
      headerAlign: 'center',
      align: 'center',
      headerName: articles.actions as string,
      getActions({ row }) {
       const actions = [];
       if (roleAccess.update) {
        actions.push(
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
           setOpenArticleContent();
          }}
          showInMenu
         />
        );
       }

       actions.push(
        <GridActionsCellItem
         key={'comments'}
         label={articles.comments as string}
         icon={<CommentIcon color='secondary' />}
         onClick={() => {
          setSelectedArticle(row);
          setOpenArticleComments();
         }}
         showInMenu
        />
       );

       if (roleAccess.changeState) {
        actions.push(
         <GridActionsCellItem
          key={'preview'}
          disabled={isPendingPreview}
          label={
           row.showForCard
            ? (articles.preview as string)
            : (articles.noPreview as string)
          }
          icon={
           row.showForCard ? (
            <StarIcon color='warning' />
           ) : (
            <StarIcon color='disabled' />
           )
          }
          onClick={() => {
           mutatePreview(row);
          }}
          showInMenu
         />
        );
       }
       if (roleAccess.remove) {
        actions.push(
         <GridActionsCellItem
          key={'changeState'}
          label={articles.changeState as string}
          icon={<SettingsIcon color='error' />}
          onClick={() => {
           setSelectedArticle(row);
           setOpenChangeState();
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
