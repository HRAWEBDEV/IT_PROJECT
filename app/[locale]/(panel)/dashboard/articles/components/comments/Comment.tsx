import { useState, MouseEvent } from 'react';
import {
 type BlogComment,
 deleteBlogComment,
 changeBlogCommentState,
} from '@/services/api-actions/globalApiActions';
import CommentList from './CommentList';
import { CommentState } from '../../utils/CommentState';
import IconButton from '@mui/material/IconButton';
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

export default function Comment({ comment }: { comment: BlogComment }) {
 const { enqueueSnackbar } = useSnackbar();
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
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
 return (
  <li>
   <div className='rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 mb-4'>
    <div className='bg-neutral-200 dark:bg-neutral-800 p-3 py-1 flex justify-between items-center gap-4'>
     <span className='font-medium text-base'>{comment.writerUserName}</span>
     <div className='flex flex-wrap gap-2 items-center'>
      <div className={`${commentStateClass} p-1 rounded-lg px-3`}>
       {comment.commentStateName}
      </div>
      <IconButton onClick={handleOpenMenu}>
       <MoreVertIcon />
      </IconButton>
     </div>
    </div>
    <div className='p-3 text-neutral-500 dark:text-neutral-200'>
     {comment.comment}
    </div>
   </div>
   <Menu open={open} onClose={handleCloseMenu} anchorEl={anchorEl}>
    {comment.commentStateID === CommentState.Pending && (
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
    {comment.commentStateID !== CommentState.Rejected && (
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
   {!!comment.childs?.length && comment.childs.length > 0 && (
    <div className='relative ms-5 ps-5 mb-4 pb-2 before:content-[""] before:absolute before:start-0 before:top-0 before:bottom-0 before:border-s-[2px] before:border-dashed before:border-neutral-300 dark:before:border-neutral-700'>
     <CommentList comments={comment.childs} />
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
