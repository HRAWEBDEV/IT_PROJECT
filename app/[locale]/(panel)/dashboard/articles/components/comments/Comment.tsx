import { useState, MouseEvent } from 'react';
import {
 type BlogComment,
 deleteBlogComment,
 changeBlogCommentState,
} from '@/services/api-actions/globalApiActions';
import CommentList from './CommentList';
import { CommentState } from '../../utils/CommentState';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Dic } from '@/localization/locales';
import ConfirmBox from '@/components/ConfirmBox';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';
import { CommentMode } from '../../utils/commentModes';
import AddComment from './AddComment';
import EditIcon from '@mui/icons-material/Edit';
import { type CommentSetting } from '../../utils/commentSetting';
import { useAuth } from '@/services/auth/authContext';
import { useAccessContext } from '../../../services/access/accessContext';

const buttonStyle = {
 padding: 0,
 paddingInline: '1rem',
 fontSize: '0.75rem',
};

const clipTextLength = 200;

export default function Comment({
 comment,
 parentComment,
 setSelectedComment,
 setSelectedParentComment,
 setCommentMode,
 onCloseAddComment,
 selectedComment,
 selectedParentComment,
 commentMode,
 depth,
 manage,
}: {
 depth: number;
 comment: BlogComment;
 parentComment: BlogComment | null;
 selectedComment: BlogComment | null;
 selectedParentComment: BlogComment | null;
 commentMode: CommentMode;
 setSelectedComment: (comment: BlogComment | null) => void;
 setSelectedParentComment: (comment: BlogComment | null) => void;
 setCommentMode: (mode: CommentMode) => void;
 onCloseAddComment: () => void;
} & CommentSetting) {
 const { roleAccess } = useAccessContext();
 const [showMore, setShowMore] = useState(false);
 const { isLogedIn } = useAuth();
 const isSameComment =
  commentMode === 'reply'
   ? comment.id === selectedParentComment?.id
   : selectedComment?.id === comment.id;
 const isLongComment = comment.comment.length > clipTextLength;
 const visibleComment = isLongComment
  ? showMore
    ? comment.comment
    : comment.comment.slice(0, clipTextLength) + ' ...'
  : comment.comment;

 const { enqueueSnackbar } = useSnackbar();
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
 const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
 });
 const [showConfirm, setShowConfirm] = useState(false);
 const { articlesComments, errorTryAgainLater } = useWebsiteDictionary() as {
  articlesComments: Dic;
  errorTryAgainLater: string;
 };
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);
 const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
 };
 const handleCloseMenu = () => {
  setAnchorEl(null);
 };
 //
 let commentStateClass = 'bg-primary text-primary-foreground';
 switch (comment.commentStateID) {
  case CommentState.Approved:
   commentStateClass = 'bg-secondary text-secondary-foreground';
   break;
  case CommentState.Rejected:
   commentStateClass = 'bg-red-700 dark:bg-red-800 text-primary-foreground';
   break;
 }
 //
 const canReply =
  comment.commentStateID !== CommentState.Rejected &&
  depth < 2 &&
  comment.childs?.length === 0 &&
  isLogedIn;

 function handleReply() {
  setSelectedComment(null);
  setSelectedParentComment(comment);
  setCommentMode('reply');
  handleCloseMenu();
 }
 //
 const { mutate: deleteComment, isPending: isDeletingComment } = useMutation({
  mutationFn: () => {
   return deleteBlogComment({
    commentID: comment.id,
    lang: locale,
   });
  },
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: ['blogComments'],
   });
   handleCloseMenu();
   setShowConfirm(false);
  },
  onError: (err: AxiosError) => {
   enqueueSnackbar({
    variant: 'error',
    message: (err.response?.data as string) || (errorTryAgainLater as string),
   });
  },
 });
 //
 const { mutate: changeCommentState, isPending: isChangingCommentState } =
  useMutation({
   mutationFn: () => {
    return changeBlogCommentState({
     blogCommentID: comment.id,
     locale,
    });
   },
   onSuccess: () => {
    queryClient.invalidateQueries({
     queryKey: ['blogComments'],
    });
    handleCloseMenu();
   },
   onError: (err: AxiosError) => {
    enqueueSnackbar({
     variant: 'error',
     message: (err.response?.data as string) || (errorTryAgainLater as string),
    });
   },
  });
 //

 //  add comment create date time

 return (
  <li>
   <span className='text-[0.7rem] font-medium mb-2'>
    {dateTimeFormatter.format(new Date(comment.createDateTimeOffset))}
   </span>
   {isSameComment && commentMode === 'edit' ? null : (
    <div className='rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 mb-4'>
     <div className='bg-neutral-200 dark:bg-neutral-800 p-3 py-1 flex justify-between flex-wrap items-center gap-4 min-h-[3rem]'>
      <div>
       <h6 className='font-medium text-base'>{comment.writerUserName}</h6>
      </div>
      <div className='flex flex-wrap items-center'>
       {isLogedIn && manage && (
        <>
         {manage && (
          <div className={`${commentStateClass} p-1 rounded-lg px-3 me-4`}>
           {comment.commentStateName}
          </div>
         )}
         {canReply && roleAccess.write && (
          <IconButton onClick={handleReply}>
           <ReplyIcon color='primary' />
          </IconButton>
         )}
         {manage && (
          <IconButton onClick={handleOpenMenu}>
           <MoreVertIcon />
          </IconButton>
         )}
        </>
       )}
      </div>
     </div>
     <div>
      <p className='p-3 text-neutral-500 dark:text-neutral-200 leading-6'>
       {visibleComment}
       {isLongComment && (
        <Button
         variant='text'
         size='small'
         color={showMore ? 'error' : 'secondary'}
         sx={buttonStyle}
         onClick={() => setShowMore(!showMore)}
        >
         {showMore
          ? (articlesComments.showLess as string)
          : (articlesComments.showMore as string)}
        </Button>
       )}
      </p>
     </div>
    </div>
   )}
   <Menu open={open} onClose={handleCloseMenu} anchorEl={anchorEl}>
    {comment.commentStateID !== CommentState.Rejected && roleAccess.update && (
     <MenuItem
      onClick={() => {
       setSelectedComment(comment);
       setSelectedParentComment(parentComment);
       setCommentMode('edit');
       handleCloseMenu();
      }}
     >
      <div className='flex items-center gap-2'>
       <EditIcon color='primary' />
       <span>{articlesComments.edit as string}</span>
      </div>
     </MenuItem>
    )}
    {canReply && (
     <MenuItem onClick={handleReply}>
      <div className='flex items-center gap-2'>
       <ReplyIcon color='primary' />
       <span>{articlesComments.reply as string}</span>
      </div>
     </MenuItem>
    )}
    {comment.commentStateID === CommentState.Pending &&
     roleAccess.changeState && (
      <MenuItem
       disabled={isChangingCommentState}
       onClick={() => {
        changeCommentState();
        handleCloseMenu();
       }}
      >
       <div className='flex items-center gap-2'>
        <SettingsIcon color='secondary' />
        <span>{articlesComments.changeState as string}</span>
       </div>
      </MenuItem>
     )}
    {comment.commentStateID !== CommentState.Rejected && roleAccess.remove && (
     <MenuItem
      disabled={isDeletingComment}
      onClick={() => {
       setShowConfirm(true);
       handleCloseMenu();
      }}
     >
      <div className='flex items-center gap-2'>
       <DeleteIcon color='error' />
       <span>{articlesComments.delete as string}</span>
      </div>
     </MenuItem>
    )}
   </Menu>
   {(commentMode === 'reply' || commentMode === 'edit') && isSameComment && (
    <div className='mb-8'>
     <AddComment
      comment={selectedComment}
      setCommentMode={setCommentMode}
      blogID={comment.blogID}
      parentComment={selectedParentComment}
      commentMode={commentMode}
      onClose={onCloseAddComment}
     />
    </div>
   )}
   {!!comment.childs?.length && comment.childs.length > 0 && (
    <div className='relative ms-5 ps-5 mb-4 pb-2 before:content-[""] before:absolute before:start-0 before:top-0 before:bottom-0 before:border-s-[2px] before:border-dashed before:border-neutral-300 dark:before:border-neutral-700'>
     <CommentList
      depth={depth + 1}
      comments={comment.childs}
      manage={manage}
      selectedComment={selectedComment}
      selectedParentComment={selectedParentComment}
      commentMode={commentMode}
      parentComment={comment}
      setSelectedComment={setSelectedComment}
      setSelectedParentComment={setSelectedParentComment}
      setCommentMode={setCommentMode}
      onCloseAddComment={onCloseAddComment}
     />
    </div>
   )}
   <ConfirmBox
    message={articlesComments.deleteCommentConfirmation as string}
    open={showConfirm}
    onConfirm={() => {
     deleteComment();
    }}
    onCancel={() => {
     setShowConfirm(false);
    }}
   />
  </li>
 );
}
