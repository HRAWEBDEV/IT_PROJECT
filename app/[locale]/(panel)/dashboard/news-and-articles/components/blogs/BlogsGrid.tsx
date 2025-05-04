'use client';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
// import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';

export default function BlogsGrid() {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) {
  return null;
 }

 return (
  <div style={{ height: 400, width: '100%' }}>
   <DataGrid
    columns={[
     {
      field: 'title',
      headerName: 'عنوان',
      flex: 1,
     },
    ]}
    showToolbar
    density='compact'
    showCellVerticalBorder
    showColumnVerticalBorder
    disableColumnFilter
    disableDensitySelector
    disableColumnSelector
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
    rows={[]}
    initialState={{
     pagination: {
      paginationModel: { page: 0, pageSize: 5 },
     },
    }}
    pageSizeOptions={[5, 10, 25]}
   />
  </div>
 );
}
