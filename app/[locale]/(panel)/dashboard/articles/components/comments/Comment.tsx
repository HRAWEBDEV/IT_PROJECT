import { BlogComment } from '@/services/api-actions/globalApiActions';
import CommentList from './CommentList';
import { CommentState } from '../../utils/CommentState';

export default function Comment({ comment }: { comment: BlogComment }) {
 let commentStateClass = 'bg-primary text-primary-foreground';
 switch (comment.commentStateID) {
  case CommentState.Approved:
   commentStateClass = 'bg-secondary text-secondary-foreground';
   break;
  case CommentState.Rejected:
   commentStateClass = 'bg-red-700 dark:bg-red-800 text-primary-foreground';
   break;
 }

 return (
  <li>
   <div className='rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 mb-4'>
    <div className='bg-neutral-200 dark:bg-neutral-800 p-3 flex justify-between items-center gap-4'>
     <span className='font-medium text-base'>{comment.writerUserName}</span>
     <div className={`${commentStateClass} p-1 rounded-lg px-3`}>
      {comment.commentStateName}
     </div>
    </div>
    <div className='p-3 text-neutral-500 dark:text-neutral-200'>
     {comment.comment}
    </div>
   </div>
   {!!comment.childs?.length && comment.childs.length > 0 && (
    <div className='relative ms-5 ps-5 mb-4 pb-2 before:content-[""] before:absolute before:start-0 before:top-0 before:bottom-0 before:border-s-[2px] before:border-dashed before:border-neutral-300 dark:before:border-neutral-700'>
     <CommentList comments={comment.childs} />
    </div>
   )}
  </li>
 );
}
