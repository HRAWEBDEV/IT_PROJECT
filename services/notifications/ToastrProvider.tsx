'use client';
import IconButton from '@mui/material/IconButton';
import { ReactNode, FC } from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

type TProps = { children: ReactNode };

const ToastrProvider: FC<TProps> = ({ children }) => {
 const matTheme = useTheme();
 const snackbarHorizontalOrigin =
  matTheme.direction === 'rtl' ? 'left' : 'right';

 return (
  <SnackbarProvider
   autoHideDuration={2000}
   anchorOrigin={{
    vertical: 'top',
    horizontal: snackbarHorizontalOrigin,
   }}
   hideIconVariant
   preventDuplicate={true}
   maxSnack={8}
   style={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
   }}
  >
   {children}
  </SnackbarProvider>
 );
};

export default ToastrProvider;
