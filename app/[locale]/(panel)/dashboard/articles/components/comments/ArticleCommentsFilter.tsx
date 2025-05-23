'use client';
import { type Dic } from '@/localization/locales';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { useFormContext, Controller } from 'react-hook-form';
import { type CommentState } from '../../schemas/comments';
import Button from '@mui/material/Button';
import { CommentMode } from '../../utils/commentModes';
import { useAuth } from '@/services/auth/authContext';
import { type CommentSetting } from '../../utils/commentSetting';
import Link from 'next/link';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAccessContext } from '../../../services/access/accessContext';

export default function ArticleCommentsFilter({
 setCommentMode,
 manage,
}: {
 setCommentMode: (mode: CommentMode) => void;
} & CommentSetting) {
 const { roleAccess } = useAccessContext();
 const { isLogedIn } = useAuth();
 const { control } = useFormContext<CommentState>();
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
 };
 return (
  <div className='mb-4 rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 bg-background'>
   {!isLogedIn ? (
    <p className='text-center font-medium text-lg'>
     <span>{articlesComments.toReply as string}</span>
     <Link href='/auth'>
      <span className='text-red-800 dark:text-red-600'>
       <u>{articlesComments.logIn as string}</u>
      </span>
     </Link>
    </p>
   ) : (
    <div className='grid lg:grid-cols-[max-content_max-content] gap-4 lg:justify-between'>
     <div>
      {manage && (
       <Controller
        control={control}
        name='removed'
        render={({ field }) => (
         <FormControlLabel
          control={
           <Switch
            {...field}
            checked={field.value}
            onChange={(newValue) => {
             field.onChange(newValue);
            }}
           />
          }
          label={articlesComments.rejected as string}
         />
        )}
       />
      )}
     </div>
     {(roleAccess.write || !manage) && (
      <div className='flex justify-end'>
       <Button
        className='w-[7rem]'
        variant='contained'
        color='secondary'
        onClick={() => setCommentMode('add')}
       >
        {articlesComments.addComment as string}
       </Button>
      </div>
     )}
    </div>
   )}
  </div>
 );
}
