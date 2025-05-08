import { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { type Blog, updateBlog } from '@/services/api-actions/globalApiActions';
import dynamic from 'next/dynamic';
import { ClassicEditor } from 'ckeditor5';
import type { CKEditor as CKEditorType } from '@ckeditor/ckeditor5-react';
import { useMutation } from '@tanstack/react-query';

const Editor = dynamic(
 () => import('./ContentEditor').then((mod) => mod.default),
 {
  ssr: false,
 }
);

type Props = {
 open: boolean;
 article: Blog;
 onClose: () => void;
};

export default function AddContent({ open, onClose, article }: Props) {
 const [content, setContent] = useState(article.body);
 const editorRef = useRef<CKEditorType<ClassicEditor>>(null);
 const { articles } = useWebsiteDictionary() as {
  articles: Dic;
 };

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='xl'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <div>
      <span className='text-base font-bold'>{articles.content as string}</span>
      <span className='ms-4 text-primary font-medium'>{article.header}</span>
     </div>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='[&_.ck-content]:h-[26rem]'>
     <Editor
      ref={editorRef}
      data={content}
      onChange={(_, e) => {
       setContent(e.getData());
      }}
     />
    </div>
   </DialogContent>
   <DialogActions>
    <Button
     className='w-[6rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
    >
     {articles.cancel as string}
    </Button>
    <Button className='w-[6rem]' variant='contained' type='submit'>
     {articles.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
