'use client';
import { useRef, useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useAccessContext } from '../../services/access/accessContext';
import NoAccessGranted from '../../components/NoAccessGranted';
import dynamic from 'next/dynamic';
import { ClassicEditor } from 'ckeditor5';
import type { CKEditor as CKEditorType } from '@ckeditor/ckeditor5-react';
import Button from '@mui/material/Button';
import {
 getAboutUs,
 updateAboutUs,
} from '@/services/api-actions/globalApiActions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

const Editor = dynamic(
 () =>
  import('../../../../../../components/ck-editor/ContentEditor').then(
   (mod) => mod.default
  ),
 {
  ssr: false,
 }
);

export default function AboutUsWrapper() {
 const { enqueueSnackbar } = useSnackbar();
 const queryClient = useQueryClient();
 const { aboutUs, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   errorTryAgainLater: string;
   aboutUs: Dic;
   changesSavedSuccessfully: string;
  };

 const { roleAccess } = useAccessContext();
 const [content, setContent] = useState('');
 const editorRef = useRef<CKEditorType<ClassicEditor>>(null);

 const { data: aboutUsRes, isLoading } = useQuery({
  queryKey: ['dashboard', 'aboutUs'],
  async queryFn() {
   const aboutUsRes = await getAboutUs().then(
    (res) => res.data.payload.AboutUs
   );
   setContent('');
   if (aboutUsRes) {
    setContent(aboutUsRes.name || '');
   }
   return aboutUsRes;
  },
 });

 const { mutate: mutateAboutUs, isPending } = useMutation({
  mutationFn() {
   const newAboutUs = {
    ...(aboutUsRes || {}),
    name: content,
   };
   return updateAboutUs(newAboutUs);
  },
  onSuccess() {
   enqueueSnackbar({
    variant: 'success',
    message: changesSavedSuccessfully,
   });
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'aboutUs'],
   });
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    variant: 'error',
    message: (err.response?.data as string) || errorTryAgainLater,
   });
  },
 });

 if (!roleAccess.read) {
  return <NoAccessGranted />;
 }

 return (
  <div>
   <h1 className='font-bold text-2xl mb-4'>{aboutUs.title as string}</h1>
   <form>
    <div className='[&_.ck-content]:h-[26rem] mb-4'>
     <Editor
      ref={editorRef}
      data={content}
      onChange={(_, e) => {
       setContent(e.getData());
      }}
     />
    </div>
    <div className='flex justify-end'>
     <Button
      className='w-[8rem]'
      variant='contained'
      type='submit'
      onClick={(e) => {
       e.preventDefault();
       mutateAboutUs();
      }}
      loading={isLoading || isPending}
     >
      {aboutUs.confirm as string}
     </Button>
    </div>
   </form>
  </div>
 );
}
