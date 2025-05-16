'use client';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
// import Button from '@mui/material/Button';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useQuery } from '@tanstack/react-query';
import {
 type Blog,
 getBlogComments,
} from '@/services/api-actions/globalApiActions';
import ArticleCommentsFilter from './ArticleCommentsFilter';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CommentState, commentStateSchema } from '../../schemas/comments';
import { commentStates } from '../../utils/CommentState';
import CommentList from './CommentList';

type Props = {
 open: boolean;
 article: Blog;
 onClose: () => void;
};

export default function ArticleComments({ open, onClose, article }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { locale } = useAppConfig();
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
 };

 const filtersUseForm = useForm<CommentState>({
  resolver: zodResolver(commentStateSchema),
  defaultValues: {
   state: commentStates[0],
  },
 });

 const commentState = filtersUseForm.watch('state');

 const {
  data: comments = [],
  isLoading,
  isError,
 } = useQuery({
  queryKey: ['blogComments', article.id, commentState],
  queryFn({ signal }) {
   return getBlogComments({
    blogID: article.id,
    isForHomepage: false,
    locale: locale,
    signal,
    commentStateID: commentState?.id,
   }).then((res) => res.data.payload.BlogComments);
  },
 });

 let content = <div></div>;

 if (isLoading) {
  content = (
   <div className='flex justify-center items-center p-10'>
    <CircularProgress />
   </div>
  );
 } else if (!comments.length || isError) {
  content = (
   <div className='flex justify-center items-center p-10 font-medium'>
    {articlesComments.noItemFound as string}
   </div>
  );
 } else {
  content = <CommentList comments={comments} />;
 }

 return (
  <Dialog
   open={open}
   fullWidth
   fullScreen={!isLargeDevice}
   maxWidth='md'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>
      {articlesComments.title as string}
     </span>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <FormProvider {...filtersUseForm}>
     <ArticleCommentsFilter />
     {content}
    </FormProvider>
   </DialogContent>
  </Dialog>
 );
}
