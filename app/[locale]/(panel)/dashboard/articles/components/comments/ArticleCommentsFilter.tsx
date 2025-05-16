'use client';
import { type Dic } from '@/localization/locales';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { useFormContext, Controller } from 'react-hook-form';
import { type CommentState } from '../../schemas/comments';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { commentStates } from '../../utils/CommentState';

export default function ArticleCommentsFilter() {
 const { control } = useFormContext<CommentState>();
 const { articlesComments } = useWebsiteDictionary() as {
  articlesComments: Dic;
 };
 return (
  <div className='mb-4 rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 bg-background top-0 sticky'>
   <div className='grid grid-cols-[minmax(0,20rem)]'>
    <Controller
     control={control}
     name='state'
     render={({ field }) => (
      <Autocomplete
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
   </div>
  </div>
 );
}
