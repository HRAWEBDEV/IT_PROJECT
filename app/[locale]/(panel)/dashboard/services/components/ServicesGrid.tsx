import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
 GridFilterModel,
} from '@mui/x-data-grid';
import {
 type Service,
 patchService,
} from '@/services/api-actions/globalApiActions';
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
 servicesList: Service[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 filterModel: GridFilterModel;
 setFilterModel: (filterModel: GridFilterModel) => void;
 selectedService: Service | null;
 setSelectedService: (service: Service | null) => void;
 setOpenAddService: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 setShowAddImage: (show: boolean) => void;
 setOpenServiceContent: () => void;
 setOpenChangeState: () => void;
 setOpenServiceComments: () => void;
 rowCount: number;
};

export default function ArticlesGrid({
 servicesList,
 isLoading,
 pagination,
 setPagination,
 rowCount,
 setSelectedService,
 setOpenAddService,
 setShowAddImage,
 selectedService,
 setOpenServiceContent,
 setOpenChangeState,
 setOpenServiceComments,
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
  services,
  deleteItemConfirmation,
  errorTryAgainLater,
  changesSavedSuccessfully,
 } = useWebsiteDictionary() as {
  services: Dic;
  deleteItemConfirmation: string;
  errorTryAgainLater: string;
  changesSavedSuccessfully: string;
 };

 const { mutate: mutatePreview, isPending: isPendingPreview } = useMutation({
  async mutationFn(service: Service) {
   return patchService({
    serviceID: service.id,
    isFour: !service.showForCard,
    locale,
   });
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'services'],
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
    rows={servicesList}
    columns={[
     {
      field: 'createDateTimeOffset',
      headerName: services.createDateTime as string,
      width: 140,
      headerAlign: 'center',
      align: 'center',
      valueFormatter(value) {
       return value && dateTimeFormatter.format(new Date(value));
      },
     },
     {
      field: 'header',
      headerName: services.serviceTitle as string,
      minWidth: 250,
      flex: 1,
     },
     {
      field: 'description',
      headerName: services.description as string,
      minWidth: 350,
      flex: 3,
     },
     {
      field: 'serviceStateName',
      headerName: services.state as string,
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
      headerName: services.actions as string,
      getActions({ row }) {
       const actions = [];
       if (roleAccess.update) {
        actions.push(
         <GridActionsCellItem
          key={'edit'}
          label={services.editService as string}
          icon={<EditIcon color='secondary' />}
          onClick={() => {
           setSelectedService(row);
           setOpenAddService();
          }}
          showInMenu
         />,
         <GridActionsCellItem
          key={'images'}
          label={services.images as string}
          icon={<ImageOutlinedIcon color='warning' />}
          onClick={() => {
           setSelectedService(row);
           setShowAddImage(true);
          }}
          showInMenu
         />,
         <GridActionsCellItem
          key={'content'}
          label={services.content as string}
          icon={<ArticleIcon color='primary' />}
          onClick={() => {
           setSelectedService(row);
           setOpenServiceContent();
          }}
          showInMenu
         />
        );
       }

       actions.push(
        <GridActionsCellItem
         key={'comments'}
         label={services.comments as string}
         icon={<CommentIcon color='secondary' />}
         onClick={() => {
          setSelectedService(row);
          setOpenServiceComments();
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
            ? (services.preview as string)
            : (services.noPreview as string)
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
          label={services.changeState as string}
          icon={<SettingsIcon color='error' />}
          onClick={() => {
           setSelectedService(row);
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
     if (!selectedService) return;
     //  deleteMutate(selectedService.id);
     setOpenConfirm(false);
     setSelectedService(null);
    }}
    onCancel={() => {
     setOpenConfirm(false);
     setSelectedService(null);
    }}
   />
  </div>
 );
}
