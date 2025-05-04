'use client';
import { MouseEvent } from 'react';
import { GridPagination } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { type TablePaginationProps } from '@mui/material/TablePagination';

const GridCustomPagination = ({
 page,
 onPageChange,
 className,
 count,
 rowsPerPage,
}: TablePaginationProps) => {
 const pageCount = Math.ceil(!rowsPerPage ? 0 : count / rowsPerPage);
 return (
  <>
   <MuiPagination
    color='primary'
    className={className}
    count={pageCount}
    page={page + 1}
    onChange={(event, newPage) => {
     onPageChange(event as MouseEvent<HTMLButtonElement>, newPage - 1);
    }}
   />
  </>
 );
};

const CustomPagination = (props: TablePaginationProps) => {
 return <GridPagination ActionsComponent={GridCustomPagination} {...props} />;
};

export default CustomPagination;
