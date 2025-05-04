import { useState, useEffect, JSXElementConstructor } from 'react';
import { DataGrid, type PaginationPropsOverrides } from '@mui/x-data-grid';
import CustomPagination from '@/components/mui/GridCustomPagination';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { type GridPaginationModel } from '@mui/x-data-grid';
import { type BlogCategory } from '@/services/api-actions/globalApiActions';

type Props = {
 pagination: GridPaginationModel;
 rowsCount: number;
 isLoading: boolean;
 blogCategories: BlogCategory[];
 onPaginationChange: (pagination: GridPaginationModel) => void;
};

export default function CategoriesGrid({
 pagination,
 onPaginationChange,
 rowsCount,
 isLoading,
 blogCategories,
}: Props) {
 const { news } = useWebsiteDictionary() as {
  news: Dic;
 };
 const [initalMount, setInitalMount] = useState(true);

 useEffect(() => {
  setInitalMount(false);
 }, []);
 return (
  <div
   style={{
    height: 'calc(100vh - var(--dashboard-header-height) - 6.7rem)',
   }}
  >
   {initalMount ? null : (
    <DataGrid
     autoPageSize
     columns={[
      {
       field: 'name',
       headerName: (news.categories as Dic).name as string,
       minWidth: 220,
       flex: 1,
      },
      {
       field: 'description',
       headerName: (news.categories as Dic).description as string,
       flex: 3,
       minWidth: 350,
      },
     ]}
     rows={blogCategories}
     paginationModel={pagination}
     onPaginationModelChange={onPaginationChange}
     paginationMode='server'
     showToolbar
     density='compact'
     showCellVerticalBorder
     showColumnVerticalBorder
     disableColumnFilter
     disableDensitySelector
     disableColumnSelector
     disableColumnSorting
     rowCount={rowsCount}
     loading={isLoading}
     slots={{
      pagination:
       CustomPagination as JSXElementConstructor<PaginationPropsOverrides>,
     }}
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
    />
   )}
  </div>
 );
}
