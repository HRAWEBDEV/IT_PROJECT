import { useState } from 'react';
import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
 GridFilterModel,
} from '@mui/x-data-grid';
import {
 type Project,
 patchProject,
} from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import ConfirmBox from '@/components/ConfirmBox';
import { useSnackbar } from 'notistack';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import { AxiosError } from 'axios';
import { useAccessContext } from '../../services/access/accessContext';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

type Props = {
 projectsList: Project[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 filterModel: GridFilterModel;
 setFilterModel: (filterModel: GridFilterModel) => void;
 selectedProject: Project | null;
 setSelectedProject: (project: Project | null) => void;
 setOpenAddProject: () => void;
 setPagination: (pagination: GridPaginationModel) => void;
 setOpenProjectContent: () => void;
 setOpenChangeState: () => void;
 setOpenAddImage: () => void;
 rowCount: number;
};

export default function ArticlesGrid({
 projectsList,
 isLoading,
 pagination,
 setPagination,
 rowCount,
 setSelectedProject,
 setOpenAddProject,
 selectedProject,
 setOpenProjectContent,
 setOpenChangeState,
 setOpenAddImage,
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
  projects,
  deleteItemConfirmation,
  errorTryAgainLater,
  changesSavedSuccessfully,
 } = useWebsiteDictionary() as {
  projects: Dic;
  deleteItemConfirmation: string;
  errorTryAgainLater: string;
  changesSavedSuccessfully: string;
 };

 const { mutate: mutatePreview, isPending: isPendingPreview } = useMutation({
  async mutationFn(project: Project) {
   return patchProject({
    projectID: project.id,
    isFour: !project.showForCard,
    locale,
   });
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'projects'],
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
    rows={projectsList}
    columns={[
     {
      field: 'createDateTimeOffset',
      headerName: projects.createDateTime as string,
      width: 140,
      headerAlign: 'center',
      align: 'center',
      valueFormatter(value) {
       return value && dateTimeFormatter.format(new Date(value));
      },
     },
     {
      field: 'header',
      headerName: projects.projectTitle as string,
      minWidth: 250,
      flex: 1,
     },
     {
      field: 'description',
      headerName: projects.description as string,
      minWidth: 350,
      flex: 3,
     },
     {
      field: 'projectStateName',
      headerName: projects.state as string,
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
      headerName: projects.actions as string,
      getActions({ row }) {
       const actions = [];
       if (roleAccess.update) {
        actions.push(
         <GridActionsCellItem
          key={'edit'}
          label={projects.editProject as string}
          icon={<EditIcon color='secondary' />}
          onClick={() => {
           setSelectedProject(row);
           setOpenAddProject();
          }}
          showInMenu
         />,
         <GridActionsCellItem
          key={'images'}
          label={projects.images as string}
          icon={<ImageOutlinedIcon color='warning' />}
          onClick={() => {
           setSelectedProject(row);
           setOpenAddImage();
          }}
          showInMenu
         />,
         <GridActionsCellItem
          key={'content'}
          label={projects.content as string}
          icon={<ArticleIcon color='primary' />}
          onClick={() => {
           setSelectedProject(row);
           setOpenProjectContent();
          }}
          showInMenu
         />
        );
       }

       if (roleAccess.changeState) {
        actions.push(
         <GridActionsCellItem
          key={'preview'}
          disabled={isPendingPreview}
          label={
           row.showForCard
            ? (projects.preview as string)
            : (projects.noPreview as string)
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
          label={projects.changeState as string}
          icon={<SettingsIcon color='error' />}
          onClick={() => {
           setSelectedProject(row);
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
     if (!selectedProject) return;
     // deleteMutate(selectedProject.id);
     setOpenConfirm(false);
     setSelectedProject(null);
    }}
    onCancel={() => {
     setOpenConfirm(false);
     setSelectedProject(null);
    }}
   />
  </div>
 );
}
