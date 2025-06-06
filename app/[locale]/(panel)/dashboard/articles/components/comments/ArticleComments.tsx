'use client';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useQuery } from '@tanstack/react-query';
import {
 type Blog,
 type BlogComment,
 getBlogComments,
} from '@/services/api-actions/globalApiActions';
import ArticleCommentsFilter from './ArticleCommentsFilter';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CommentState, commentStateSchema } from '../../schemas/comments';
import { commentStates } from '../../utils/CommentState';
import CommentList from './CommentList';
import { type CommentMode } from '../../utils/commentModes';
import AddComment from './AddComment';
import { CommentState as CommentStateEnum } from '../../utils/CommentState';
import { type CommentSetting } from '../../utils/commentSetting';
import { useAccessContext } from '../../../services/access/accessContext';
import NoAccessGranted from '../../../components/NoAccessGranted';

type Props = {
 open: boolean;
 article: Blog;
 onClose: () => void;
} & CommentSetting;

export default function ArticleComments({
 open,
 onClose,
 article,
 manage = true,
}: Props) {
 const { roleAccess } = useAccessContext();
 const [selectedComment, setSelectedComment] = useState<BlogComment | null>(
  null
 );
 const [selectedParentComment, setSelectedParentComment] =
  useState<BlogComment | null>(null);
 const [commentMode, setCommentMode] = useState<CommentMode>('none');

 const { isLargeDevice } = useAppMonitorConfig();
 const { locale } = useAppConfig();
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
 };
 const filtersUseForm = useForm<CommentState>({
  resolver: zodResolver(commentStateSchema),
  defaultValues: {
   state: commentStates[0],
   removed: false,
  },
 });
 const commentState = filtersUseForm.watch('state');
 const removed = filtersUseForm.watch('removed');

 const {
  data: comments = [],
  isLoading,
  isError,
 } = useQuery({
  queryKey: ['blogComments', article.id, commentState, removed],
  queryFn({ signal }) {
   return getBlogComments({
    blogID: article.id,
    dashboard: manage,
    isForHomepage: manage ? false : true,
    locale: locale,
    signal,
    commentStateID: manage
     ? removed
       ? CommentStateEnum.Rejected
       : undefined
     : CommentStateEnum.Approved,
   }).then((res) => res.data.payload.BlogComments);
  },
 });
 //
 function handleCloseAddComment() {
  setSelectedComment(null);
  setSelectedParentComment(null);
  setCommentMode('none');
 }
 //

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
  content = (
   <CommentList
    manage={manage}
    depth={1}
    comments={comments}
    parentComment={selectedParentComment}
    selectedComment={selectedComment}
    selectedParentComment={selectedParentComment}
    commentMode={commentMode}
    setSelectedComment={setSelectedComment}
    setSelectedParentComment={setSelectedParentComment}
    setCommentMode={setCommentMode}
    onCloseAddComment={handleCloseAddComment}
   />
  );
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
    {roleAccess.read || !manage ? (
     <FormProvider {...filtersUseForm}>
      <ArticleCommentsFilter setCommentMode={setCommentMode} manage={manage} />
      <div className='mb-8'>
       {commentMode === 'add' && (
        <AddComment
         blogID={article.id}
         commentMode={commentMode}
         comment={selectedComment}
         parentComment={selectedParentComment}
         onClose={handleCloseAddComment}
         setCommentMode={setCommentMode}
        />
       )}
      </div>
      {content}
     </FormProvider>
    ) : (
     <NoAccessGranted />
    )}
   </DialogContent>
  </Dialog>
 );
}
