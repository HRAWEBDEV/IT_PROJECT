import { type BlogComment } from '@/services/api-actions/globalApiActions';
import CommentList from './CommentList';
import Button from '@mui/material/Button';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useState } from 'react';

const buttonStyle = {
 padding: 0,
 paddingInline: '1rem',
 fontSize: '0.75rem',
};

const clipTextLength = 200;

export default function Comment({
 comment,
 depth,
}: {
 depth: number;
 comment: BlogComment;
}) {
 const { locale } = useAppConfig();
 const [showMore, setShowMore] = useState(false);
 const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
 });
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
  errorTryAgainLater: string;
 };
 const isLongComment = comment.comment.length > clipTextLength;
 const visibleComment = isLongComment
  ? showMore
    ? comment.comment
    : comment.comment.slice(0, clipTextLength) + ' ...'
  : comment.comment;

 return (
  <li>
   <span className='text-[0.7rem] font-medium mb-2'>
    {dateTimeFormatter.format(new Date(comment.createDateTimeOffset))}
   </span>
   <div className='rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 mb-4'>
    <div className='bg-neutral-200 dark:bg-neutral-800 p-3 py-1 flex justify-between flex-wrap items-center gap-4 min-h-[3rem]'>
     <div>
      <h6 className='font-medium text-base'>{comment.writerUserName}</h6>
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
   {!!comment.childs?.length && comment.childs.length > 0 && (
    <div className='relative ms-5 ps-5 mb-4 pb-2 before:content-[""] before:absolute before:start-0 before:top-0 before:bottom-0 before:border-s-[2px] before:border-dashed before:border-neutral-300 dark:before:border-neutral-700'>
     <CommentList depth={depth + 1} comments={comment.childs} />
    </div>
   )}
  </li>
 );
}
