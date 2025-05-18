import { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import {
 updateUserImage,
 updateUser,
} from '@/services/api-actions/globalApiActions';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { AxiosError } from 'axios';
import { useAuthCheck } from '@/services/auth/authCheckContext';

type Props = {
 open: boolean;
 onClose: () => void;
};

const validFileExtensions = ['png', 'jpg', 'jpeg'];
function formatFileSize(size: number): number {
 if (!size) return 0;
 return Math.ceil(size / 1000);
}

export default function AddImage({ open, onClose }: Props) {
 const { userInfo, refreshUserInfo } = useAuthCheck();
 const { isLargeDevice } = useAppMonitorConfig();
 const snackbar = useSnackbar();
 const { articles, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   articles: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };
 const [dragStart, setDragStart] = useState(false);
 const [fileValue, setFileValue] = useState('');
 const purchaseFileRef = useRef<HTMLInputElement>(null);
 const { mutate: handleUpdateUserImage, isPending: isUpdating } = useMutation({
  async mutationFn(formData: FormData) {
   if (!userInfo?.User) return;
   const imageUrl = await updateUserImage(formData).then((res) => res.data);
   return updateUser({
    ...userInfo.User,
    profileImage: imageUrl,
   });
  },
  onSuccess: () => {
   snackbar.enqueueSnackbar({
    variant: 'success',
    message: changesSavedSuccessfully as string,
   });
   refreshUserInfo();
   onClose();
  },
  onError: (error: AxiosError) => {
   snackbar.enqueueSnackbar({
    variant: 'error',
    message: (error.response?.data as string) || errorTryAgainLater,
   });
  },
 });

 return (
  <Dialog
   open={open}
   fullWidth
   fullScreen={!isLargeDevice}
   maxWidth='sm'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <div>
      <span className='text-base font-bold'>{articles.images as string}</span>
     </div>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <ul className='list-disc list-inside'>
     <li className='mb-2 font-medium'>{articles.fileLimitMessage as string}</li>
     <li className='mb-2 font-medium'>{articles.fileExtension as string}</li>
    </ul>
    <div className='bg-background rounded-lg p-4 border border-neutral-300 dark:border-neutral-700'>
     <div
      data-drag-start={dragStart}
      className='h-52 relative cursor-pointer p-4'
      onDrop={() => {
       setDragStart(false);
      }}
      onDragEnter={() => {
       setDragStart(true);
      }}
      onDragLeave={() => {
       setDragStart(false);
      }}
     >
      {dragStart && (
       <div className='absolute inset-0 border-[4px] border-dashed rounded border-sky-200 bg-sky-200/30 dark:border-sky-800 dark:bg-sky-800/30'></div>
      )}
      <input
       ref={purchaseFileRef}
       type='file'
       id='purchase-file'
       name='purchase-file'
       className='absolute inset-0 opacity-0 cursor-pointer z-[2]'
       accept={validFileExtensions.join(',')}
       value={fileValue}
       onChange={(e) => {
        if (e.target.files && e.target.files.length) {
         const size = formatFileSize(e.target.files[0].size);
         const extenstion = e.target.files[0].name;
         if (size > 5000) {
          snackbar.enqueueSnackbar({
           variant: 'error',
           message: articles.fileLimitMessage as string,
          });
         }
         if (!validFileExtensions.includes(extenstion.split('.')[1])) {
          snackbar.enqueueSnackbar({
           variant: 'error',
           message: articles.fileExtension as string,
          });
         }
         setFileValue(e.target.value);
         const formData = new FormData();
         formData.append('FormFile', e.target.files[0]);
         handleUpdateUserImage(formData);
        }
       }}
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-4'>
       <div className='text-center'>
        <p className='text-base'>
         {articles.dragFileOrClickToUpload as string}
        </p>
       </div>
       {isUpdating ? (
        <CircularProgress
         className='text-neutral-400'
         sx={{
          fontSize: '4rem',
         }}
        />
       ) : (
        <FileDownloadIcon
         className='text-neutral-400'
         sx={{
          fontSize: '4rem',
         }}
        />
       )}
      </div>
     </div>
    </div>
   </DialogContent>
  </Dialog>
 );
}
