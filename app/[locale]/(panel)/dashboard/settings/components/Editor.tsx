'use client';
import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
 ClassicEditor,
 Autoformat,
 FontSize,
 Bold,
 Italic,
 Underline,
 BlockQuote,
 Base64UploadAdapter,
 CloudServices,
 Essentials,
 Heading,
 Image,
 ImageCaption,
 ImageResize,
 ImageStyle,
 ImageToolbar,
 ImageUpload,
 PictureEditing,
 Indent,
 IndentBlock,
 Link,
 List,
 MediaEmbed,
 Mention,
 Paragraph,
 PasteFromOffice,
 Table,
 TableColumnResize,
 TableToolbar,
 TextTransformation,
} from 'ckeditor5';
import Button from '@mui/material/Button';

export default function Editor() {
 const editorRef = useRef<ClassicEditor>(null);
 return (
  <div>
   <CKEditor
    editor={ClassicEditor}
    onReady={(editor) => {
     editorRef.current = editor;
    }}
    onChange={(...params) => console.log(params)}
    config={{
     licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_API_KEY,
     plugins: [
      Autoformat,
      BlockQuote,
      Bold,
      FontSize,
      CloudServices,
      Essentials,
      Heading,
      Image,
      ImageCaption,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Base64UploadAdapter,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      MediaEmbed,
      Mention,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      Table,
      TableColumnResize,
      TableToolbar,
      TextTransformation,
      Underline,
     ],
     toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'fontSize',
      '|',
      'link',
      'uploadImage',
      'ckbox',
      'insertTable',
      'blockQuote',
      'mediaEmbed',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
     ],
     initialData: `<p>this is the initial data of the editor</p>`,
     language: {
      ui: 'fa',
      content: 'fa',
     },
     heading: {
      options: [
       {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
       },
       {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
       },
       {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
       },
       {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
       },
       {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
       },
      ],
     },
     image: {
      resizeOptions: [
       {
        name: 'resizeImage:original',
        label: 'Default image width',
        value: null,
       },
       {
        name: 'resizeImage:50',
        label: '50% page width',
        value: '50',
       },
       {
        name: 'resizeImage:75',
        label: '75% page width',
        value: '75',
       },
      ],
      toolbar: [
       'imageTextAlternative',
       'toggleImageCaption',
       '|',
       'imageStyle:inline',
       'imageStyle:wrapText',
       'imageStyle:breakText',
       '|',
       'resizeImage',
      ],
     },
     link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
     },
     table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
     },
    }}
   />
   <Button
    onClick={() => {
     console.log(editorRef.current?.getData());
     console.log(editorRef.current?.setData(`<p>setting the editor data</p>`));
    }}
   >
    get Data
   </Button>
  </div>
 );
}
