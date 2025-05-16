import { useEffect, useRef } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { BlogComment } from '@/services/api-actions/globalApiActions';
import { type CommentMode } from '../../utils/commentModes';
import { useForm } from 'react-hook-form';
import {
 type AddCommentSchema,
 addCommentSchema,
} from '../../schemas/addComment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
 createBlogComment,
 updateBlogComment,
} from '@/services/api-actions/globalApiActions';
import { useSnackbar } from 'notistack';
import { useAppConfig } from '@/services/app-config/appConfig';
import { AxiosError } from 'axios';

type Props = {
 parentComment: BlogComment | null;
 comment: BlogComment | null;
 commentMode: CommentMode;
 blogID: number;
 setCommentMode: (mode: CommentMode) => void;
 onClose: () => void;
};

export default function AddComment({
 parentComment,
 comment,
 commentMode,
 blogID,
 onClose,
}: Props) {
 const inputRef = useRef<HTMLInputElement>(null);
 const queryClient = useQueryClient();
 const { locale } = useAppConfig();
 const { enqueueSnackbar } = useSnackbar();
 const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
 } = useForm<AddCommentSchema>({
  resolver: zodResolver(addCommentSchema),
  defaultValues: {
   comment: '',
  },
 });

 const commentValue = watch('comment');

 const { articlesComments, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   articlesComments: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };

 const { mutate: createComment, isPending: isCreating } = useMutation({
  mutationFn: (data: AddCommentSchema) => {
   if (commentMode === 'edit' && comment) {
    return updateBlogComment({
     id: comment.id,
     blogID: blogID,
     comment: data.comment,
     lang: locale,
     parentID: parentComment?.id || null,
     commentStateID: comment.commentStateID,
    });
   }
   return createBlogComment({
    blogID: blogID,
    comment: data.comment,
    lang: locale,
    parentID: commentMode === 'reply' ? parentComment?.id || null : null,
    id: 0,
   });
  },
  onSuccess: () => {
   enqueueSnackbar({
    variant: 'success',
    message: changesSavedSuccessfully as string,
   });
   queryClient.invalidateQueries({
    queryKey: ['blogComments', blogID],
   });
   onClose();
  },
  onError: (err: AxiosError) => {
   enqueueSnackbar({
    message: (err.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
 });
 async function onSubmit(data: AddCommentSchema) {
  createComment(data);
 }

 useEffect(() => {
  if (comment && commentMode === 'edit') {
   setValue('comment', comment.comment);
  } else {
   setValue('comment', '');
  }
  if (inputRef.current) {
   inputRef.current.focus();
  }
 }, [commentMode, comment, setValue]);

 return (
  <form className='p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-sky-50 dark:bg-sky-950'>
   <div>
    <TextField
     inputRef={(ref) => {
      if (ref && ref.current) {
       ref.current.focus();
      }
      inputRef.current = ref;
     }}
     autoFocus
     {...register('comment')}
     fullWidth
     multiline
     rows={5}
     label={articlesComments.addCommentPlaceholder as string}
     required
     error={!!errors.comment}
     slotProps={{
      inputLabel: {
       shrink: !!commentValue || undefined,
      },
     }}
    />
   </div>
   <div className='flex justify-end gap-2 items-center mt-3'>
    <Button
     loading={isCreating}
     className='w-[7rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
    >
     {articlesComments.cancel as string}
    </Button>
    <Button
     loading={isCreating}
     className='w-[7rem]'
     variant='contained'
     onClick={handleSubmit(onSubmit)}
    >
     {articlesComments.addComment as string}
    </Button>
   </div>
  </form>
 );
}
