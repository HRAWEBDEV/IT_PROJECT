import { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {
 type Blog,
 getBlogImages,
 createBlogImage,
 updateBlog,
 getBlogTags,
} from '@/services/api-actions/globalApiActions';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppConfig } from '@/services/app-config/appConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ImageWrapper from '@/components/ImageWrapper';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { AxiosError } from 'axios';

type Props = {
 open: boolean;
 article: Blog;
 onClose: () => void;
};

const validFileExtensions = ['png', 'jpg', 'jpeg'];
function formatFileSize(size: number): number {
 if (!size) return 0;
 return Math.ceil(size / 1000);
}

export default function AddImage({ open, onClose, article }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { locale } = useAppConfig();
 const snackbar = useSnackbar();
 const { articles, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   articles: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };
 const queryClient = useQueryClient();
 const [dragStart, setDragStart] = useState(false);
 const [fileValue, setFileValue] = useState('');
 const purchaseFileRef = useRef<HTMLInputElement>(null);
 const { mutate: mutateImage, isPending: isUploading } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['blog-images', article.id],
   });
   snackbar.enqueueSnackbar({
    message: changesSavedSuccessfully as string,
    variant: 'success',
   });
   onClose();
  },
  onError(error: AxiosError) {
   snackbar.enqueueSnackbar({
    variant: 'error',
    message: (error.response?.data as string) || errorTryAgainLater,
   });
  },
  mutationFn: async (formData: FormData) => {
   const result = await createBlogImage(formData);
   const tagResult = await getBlogTags({
    locale,
    blogID: article!.id,
   });
   return updateBlog({
    locale,
    id: article.id,
    body: article.body,
    blogCategoryID: article.blogCategoryID,
    header: article.header,
    description: article.description,
    blogStateID: article.blogStateID,
    blogTags: tagResult.data.payload.BlogTags.map((item) => ({
     tagID: item.tagID,
     lang: locale,
     blogID: article.id,
    })),
    blogImage: {
     imageUrl: result.data,
     lang: locale,
     blogID: article.id,
    },
   });
  },
 });

 const {
  data: images = [],
  isLoading,
  isFetching,
 } = useQuery({
  queryKey: ['blog-images', article.id],
  queryFn: () =>
   getBlogImages({ blogID: article.id, locale }).then(
    (res) => res.data.payload.BlogImages
   ),
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
      <span className='ms-4 text-primary font-medium'>{article.header}</span>
     </div>
     <IconButton color='error' onClick={onClose} disabled={isUploading}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    {!!images.length && (
     <div className='mb-4'>
      <Swiper
       pagination={{
        clickable: true,
       }}
       modules={[Pagination]}
       slidesPerView={1}
      >
       {images.map((item) => (
        <SwiperSlide key={item.imageUrl}>
         <div className='min-h-[14rem] rounded-lg overflow-hidden relative'>
          <ImageWrapper
           img={{
            src:
             (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace('API', '') +
             item.imageUrl,
            alt: 'blog image',
            className: 'object-cover object-center',
           }}
           wrapper={{
            className: 'min-h-[14rem] flex flex-col',
           }}
          />
         </div>
        </SwiperSlide>
       ))}
      </Swiper>
     </div>
    )}
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
       disabled={isUploading}
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
         mutateImage(formData);
        }
       }}
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-4'>
       <div className='text-center'>
        <p className='text-base'>
         {articles.dragFileOrClickToUpload as string}
        </p>
       </div>
       {isLoading || isFetching || isUploading ? (
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
