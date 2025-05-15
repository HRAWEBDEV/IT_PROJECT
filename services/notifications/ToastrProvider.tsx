'use client';
import { ReactNode, FC } from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
type TProps = { children: ReactNode };

const ToastrProvider: FC<TProps> = ({ children }) => {
 return (
  <SnackbarProvider
   autoHideDuration={2000}
   anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
   }}
   hideIconVariant
   preventDuplicate={true}
   maxSnack={8}
   action={(snackbarId) => (
    <div className='absolute end-0 top-[50%] translate-y-[-50%]'>
     <IconButton
      sx={{
       color: 'inherit',
      }}
      onClick={() => closeSnackbar(snackbarId)}
     >
      <CloseIcon />
     </IconButton>
    </div>
   )}
   style={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    paddingInlineEnd: '2.5rem',
    position: 'relative',
   }}
  >
   {children}
  </SnackbarProvider>
 );
};

export default ToastrProvider;
