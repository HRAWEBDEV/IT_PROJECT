import {
 DataGrid,
 GridPaginationModel,
 GridActionsCellItem,
} from '@mui/x-data-grid';
import { type Tag, deleteTag } from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';

type Props = {
 tagsList: Tag[];
 isLoading: boolean;
 pagination: GridPaginationModel;
 setPagination: (pagination: GridPaginationModel) => void;
 rowCount: number;
};

export default function TagsGrid({
 tagsList,
 isLoading,
 pagination,
 setPagination,
 rowCount,
}: Props) {
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
 const { mutate: deleteMutate, isPending } = useMutation({
  mutationFn(id: number) {
   return deleteTag({
    tagID: id,
    locale,
   }).then(() => {
    queryClient.invalidateQueries({
     queryKey: ['dashboard', 'tags'],
    });
   });
  },
 });

 const { tags } = useWebsiteDictionary() as {
  tags: Dic;
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
      getActions({ id }) {
       return [
        <GridActionsCellItem
         key={'edit'}
         label={tags.editTag as string}
         icon={<EditIcon color='secondary' />}
         showInMenu
        />,
        <GridActionsCellItem
         key={'remove'}
         disabled={isPending}
         label={tags.deleteTag as string}
         icon={<DeleteIcon color='error' />}
         onClick={() => deleteMutate(id as number)}
         showInMenu
        />,
       ];
      },
     },
    ]}
   />
  </div>
 );
}
