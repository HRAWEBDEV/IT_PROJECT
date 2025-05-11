import { forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
 CKEditor as CKEditorType,
 useCKEditorCloud,
} from '@ckeditor/ckeditor5-react';
import { useAppConfig } from '@/services/app-config/appConfig';
import { ClassicEditor } from 'ckeditor5';

type ContentEditorProps = Omit<
 React.ComponentProps<typeof CKEditorType>,
 'editor'
>;

const ContentEditor = forwardRef<
 CKEditorType<ClassicEditor>,
 ContentEditorProps
>(function ContentEditor(props, ref) {
 const { locale } = useAppConfig();
 const cloud = useCKEditorCloud({
  version: '45.0.0',
  premium: false,
 });
 if (cloud.status === 'error') {
  return <div>Error!</div>;
 }

 if (cloud.status === 'loading') {
  return <div>Loading...</div>;
 }

 const {
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
 } = cloud.CKEditor;

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
     styles: {
      options: ['inline', 'block', 'side'],
     },
     upload: {
      types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
     },
    },
    link: {
     addTargetToExternalLinks: true,
     decorators: {
      openInNewTab: {
       mode: 'manual',
       label: 'Open in a new tab',
       defaultValue: true,
       attributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
       },
      },
     },
    },
    table: {
     contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    htmlSupport: {
     allow: [
      {
       name: /.*/,
       attributes: true,
       classes: true,
       styles: true,
      },
     ],
    },
    htmlEmbed: {
     showPreviews: true,
    },
   }}
  />
 );
});

export default ContentEditor;
