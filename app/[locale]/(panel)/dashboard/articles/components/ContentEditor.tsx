import { forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { CKEditor as CKEditorType } from '@ckeditor/ckeditor5-react';
import { useAppConfig } from '@/services/app-config/appConfig';
import { createBlogImage } from '@/services/api-actions/globalApiActions';
import {
 ClassicEditor,
 Autoformat,
 FontSize,
 Bold,
 Italic,
 Underline,
 BlockQuote,
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
import type { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload';

// Custom upload adapter class
class CustomUploadAdapter implements UploadAdapter {
 private loader: FileLoader;
 constructor(loader: FileLoader) {
  this.loader = loader;
 }
 async upload() {
  console.log('here');
  const formData = new FormData();
  const file = await this.loader.file;
  if (!file) {
   throw new Error('No file selected');
  }
  formData.append('FormFile', file);
  try {
   const response = await createBlogImage(formData);
   return {
    default:
     (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace('API', '') +
     response.data,
   };
  } catch (error) {
   throw error;
  }
 }
 abort() {
  // Abort upload process
 }
}

type ContentEditorProps = Omit<
 React.ComponentProps<typeof CKEditorType>,
 'editor'
>;

const ContentEditor = forwardRef<
 CKEditorType<ClassicEditor>,
 ContentEditorProps
>(function ContentEditor(props, ref) {
 const { locale } = useAppConfig();
 return (
  <CKEditor
   ref={ref}
   editor={ClassicEditor}
   {...props}
   config={{
    style: {},
    licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_API_KEY,
    language: {
     ui: locale,
     content: locale,
    },
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
     'fontSize',
     'bold',
     'italic',
     'underline',
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
    },
    table: {
     contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
   }}
   onReady={(editor) => {
    // Configure the upload adapter
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
     return new CustomUploadAdapter(loader);
    };
   }}
  />
 );
});

export default ContentEditor;
