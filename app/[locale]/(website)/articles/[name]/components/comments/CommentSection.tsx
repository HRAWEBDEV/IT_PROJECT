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
import { useQuery } from '@tanstack/react-query';
import {
 type Blog,
 getBlogComments,
 createBlogComment,
} from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import AccessProvider from '@/app/[locale]/(panel)/dashboard/services/access/AccessProvider';
import CommentList from './CommentList';

type Props = {
 blog: Blog | null;
};

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
     <span>{articlesComments.toReply as string}</span>{' '}
     <Link href='/auth'>
      {' '}
      <span className='text-red-800 dark:text-red-600'>
       {' '}
       <u>{articlesComments.logIn as string}</u>
      </span>
     </Link>
    </p>
   )}
   {isLoading ? (
    <div className='flex justify-center items-center min-h-[8rem]'>
     <CircularProgress />
    </div>
   ) : (
    <CommentList depth={0} comments={comments.slice(0, 4)} />
   )}
   {!!comments.length && (
    <div>
     <div className='mb-4 flex justify-end'>
      <Button
       loading={isLoading}
       variant='outlined'
       color='primary'
       onClick={() => setShowAllComments(true)}
      >
       {dic.showAllComments as string}
      </Button>
     </div>
    </div>
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
