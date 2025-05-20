'use client';
import { useState } from 'react';
import ArticleComments from '@/app/[locale]/(panel)/dashboard/articles/components/comments/ArticleComments';
import TextField from '@mui/material/TextField';
import { GradientButton } from '@/components/Button/GradientButton';
import { type Dic, WithDictionary } from '@/localization/locales';
import { useAuth } from '@/services/auth/authContext';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { CommentState as CommentStateEnum } from '@/app/[locale]/(panel)/dashboard/articles/utils/CommentState';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import {
 type Blog,
 getBlogComments,
 createBlogComment,
} from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import { Pagination } from 'swiper/modules';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import AccessProvider from '@/app/[locale]/(panel)/dashboard/services/access/AccessProvider';

type Props = {
 blog: Blog | null;
};

const commentTextLimit = 200;

export default function CommentSection({ dic, blog }: WithDictionary & Props) {
 const { enqueueSnackbar } = useSnackbar();
 const [newComment, setNewComment] = useState('');
 const [showAllComments, setShowAllComments] = useState(false);
 const { articlesComments, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   articlesComments: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };
 const { isLogedIn } = useAuth();
 const { locale } = useAppConfig();

 const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
 });

 const { data: comments = [], isLoading } = useQuery({
  queryKey: ['blogCommentsSection', blog!.id],
  queryFn({ signal }) {
   return getBlogComments({
    blogID: blog!.id,
    isForHomepage: true,
    locale: locale,
    signal,
    commentStateID: CommentStateEnum.Approved,
   }).then((res) => res.data.payload.BlogComments);
  },
 });
 //
 const { mutate, isPending } = useMutation({
  mutationFn() {
   return createBlogComment({
    blogID: blog!.id,
    comment: newComment,
    parentID: null,
    id: 0,
    lang: locale,
   });
  },
  onSuccess() {
   enqueueSnackbar({
    variant: 'success',
    message: changesSavedSuccessfully,
   });
   setNewComment('');
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    variant: 'error',
    message: (err.response?.data as string) || errorTryAgainLater,
   });
  },
 });

 return (
  <section className='container mb-8'>
   <h3 className='text-2xl font-medium lg:text-3xl mb-6'>
    {dic.comments as string}
   </h3>
   {isLoading ? (
    <div className='flex justify-center items-center min-h-[8rem]'>
     <CircularProgress />
    </div>
   ) : (
    !!comments.length && (
     <div>
      {comments.length > 9 && (
       <div className='mb-4 flex justify-end'>
        <Button
         variant='outlined'
         color='primary'
         onClick={() => setShowAllComments(true)}
        >
         {dic.showAllComments as string}
        </Button>
       </div>
      )}
      <Swiper
       spaceBetween={20}
       pagination
       modules={[Pagination]}
       breakpoints={{
        768: {
         slidesPerView: 2,
        },
        1024: {
         slidesPerView: 3,
        },
        1258: {
         slidesPerView: 4,
        },
       }}
       className='!pb-10 [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--foreground))] [&]:[--swiper-pagination-color:hsl(var(--foreground))]'
      >
       {comments.slice(0, 9).map((comment) => (
        <SwiperSlide key={comment.id}>
         <p className='text-[0.7rem] font-medium mb-2'>
          {dateTimeFormatter.format(new Date(comment.createDateTimeOffset))}
         </p>
         <article className='rounded-lg border border-neutral-300 dark:border-neutral-700'>
          <header className='p-3 mb-1 border-b border-neutral-300 dark:border-neutral-700'>
           <p className='font-medium'>{comment.writerUserName}</p>
          </header>
          <div className='p-3 min-h-[10rem]'>
           <p className='leading-6 text-neutral-500 dark:text-neutral-200'>
            {comment.comment.length > commentTextLimit
             ? comment.comment.slice(0, commentTextLimit) + '...'
             : comment.comment}
            {comment.comment.length > commentTextLimit && (
             <Button
              variant='text'
              color='primary'
              className='!py-0'
              onClick={() => setShowAllComments(true)}
             >
              {articlesComments.showMore as string}
             </Button>
            )}
           </p>
          </div>
         </article>
        </SwiperSlide>
       ))}
      </Swiper>
     </div>
    )
   )}
   {isLogedIn ? (
    <form className=''>
     <div className='mb-4'>
      <TextField
       fullWidth
       multiline
       value={newComment}
       onChange={(e) => setNewComment(e.target.value)}
       placeholder='دیدگاه خود را بنویسید'
       rows={5}
      />
     </div>
     <div className='flex justify-end'>
      <GradientButton
       loading={isPending}
       size='large'
       className='mt-4 w-[10rem]'
       onClick={(e) => {
        e.preventDefault();
        mutate();
       }}
      >
       {dic.send as string}
      </GradientButton>
     </div>
    </form>
   ) : (
    <p className='text-center font-medium text-lg'>
     <span>{articlesComments.toReply as string}</span>
     <Link href='/auth'>
      <span className='text-red-800 dark:text-red-600'>
       <u>{articlesComments.logIn as string}</u>
      </span>
     </Link>
    </p>
   )}
   <AccessProvider formTitle='articlesComments'>
    <ArticleComments
     open={showAllComments}
     onClose={() => setShowAllComments(false)}
     article={blog!}
     manage={false}
    />
   </AccessProvider>
  </section>
 );
}
