import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { type Tag } from '@/services/api-actions/globalApiActions';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
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
    loading={isLoading}
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
    ]}
   />
  </div>
 );
}
