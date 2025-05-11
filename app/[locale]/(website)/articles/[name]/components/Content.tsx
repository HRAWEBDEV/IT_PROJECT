'use client';
import { useRef, useId } from 'react';
import { type Blog } from '@/services/api-actions/globalApiActions';
import { CKEditor as CKEditorType } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';

import dynamic from 'next/dynamic';
const ContentEditor = dynamic(
 () => import('@/components/ck-editor/ContentEditor'),
 {
  ssr: false,
 }
);

type Props = {
 blog: Blog | null;
};

export default function Content({ blog }: Props) {
 const id = useId();
 const editorRef = useRef<CKEditorType<ClassicEditor>>(null);
 return (
  <article className='my-12 container'>
   <ContentEditor
    ref={(ref) => {
     editorRef.current = ref;
     if (ref) {
      ref.editor?.enableReadOnlyMode(id);
     }
    }}
    data={blog?.body || ''}
   />
  </article>
 );
}
