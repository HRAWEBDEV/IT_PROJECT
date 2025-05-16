'use client';
import { type Dic } from '@/localization/locales';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { useFormContext, Controller } from 'react-hook-form';
import { type CommentState } from '../../schemas/comments';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { commentStates } from '../../utils/CommentState';
import Button from '@mui/material/Button';
import { CommentMode } from '../../utils/commentModes';

export default function ArticleCommentsFilter({
 setCommentMode,
}: {
 setCommentMode: (mode: CommentMode) => void;
}) {
 const { control } = useFormContext<CommentState>();
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
 };
 return (
  <div className='mb-4 rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 bg-background'>
   <div className='grid lg:grid-cols-[minmax(0,20rem)_max-content] gap-4 lg:justify-between'>
    <Controller
     control={control}
     name='state'
     render={({ field }) => (
      <Autocomplete
       fullWidth
       disableClearable={true}
       size='small'
       {...field}
       onChange={(_, value) => {
        field.onChange(value);
       }}
       options={commentStates}
       getOptionLabel={(option) =>
        articlesComments[option.name as keyof Dic] as string
       }
       renderInput={(params) => (
        <TextField
         {...params}
         label={articlesComments.commentState as string}
        />
       )}
      />
     )}
    />
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
   </div>
  </div>
 );
}
