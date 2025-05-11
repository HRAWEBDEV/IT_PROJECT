import { forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
 CKEditor as CKEditorType,
 useCKEditorCloud,
} from '@ckeditor/ckeditor5-react';
import { useAppConfig } from '@/services/app-config/appConfig';
import { ClassicEditor } from 'ckeditor5';
import type { Editor } from '@ckeditor/ckeditor5-core';
import type {
 FileLoader,
 UploadAdapter,
 UploadResponse,
} from '@ckeditor/ckeditor5-upload';
import { createBlogImage } from '@/services/api-actions/globalApiActions';

// Custom upload adapter
class CustomUploadAdapter implements UploadAdapter {
 private loader: FileLoader;
 private editor: Editor;

 constructor(loader: FileLoader, editor: Editor) {
  this.loader = loader;
  this.editor = editor;
 }

 upload(): Promise<UploadResponse> {
  return this.loader.file.then(
   (file) =>
    new Promise<UploadResponse>((resolve, reject) => {
     if (!file) {
      this.removeUploadedImage();
      reject(new Error('No file selected'));
      return;
     }
     const formData = new FormData();
     formData.append('FormFile', file as Blob);
     createBlogImage(formData)
      .then((response) => {
       resolve({
        default: (process.env.NEXT_PUBLIC_BASE_URL || '') + response.data,
       });
      })
      .catch((err) => {
       this.removeUploadedImage();
       reject(new Error(err));
      });
    })
  );
 }
 private removeUploadedImage(): void {
  const root = this.editor.model.document.getRoot();
  if (!root) return;
  const images = Array.from(root.getChildren()).filter((node) =>
   node.is('element', 'imageBlock')
  );
  if (images.length > 0) {
   this.editor.model.change((writer) => {
    writer.remove(images[images.length - 1]);
   });
  }
 }
 abort(): void {
  this.removeUploadedImage();
 }
}

// Plugin that registers the custom upload adapter
function CustomUploadAdapterPlugin(editor: Editor): void {
 editor.plugins.get('FileRepository').createUploadAdapter = (
  loader: FileLoader
 ): UploadAdapter => {
  return new CustomUploadAdapter(loader, editor);
 };
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
  Bold,
  Italic,
  Highlight,
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
  Font,
  Alignment,
  TodoList,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  Autosave,
  TextTransformation,
  Strikethrough,
 } = cloud.CKEditor;

 return (
  <CKEditor
   ref={ref}
   editor={ClassicEditor}
   {...props}
   config={{
    licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_API_KEY,
    language: {
     ui: locale,
     content: locale,
    },
    plugins: [
     Autoformat,
     BlockQuote,
     Bold,
     CloudServices,
     Essentials,
     Font,
     Highlight,
     Heading,
     Alignment,
     Image,
     ImageCaption,
     ImageResize,
     ImageStyle,
     ImageToolbar,
     ImageUpload,
     CustomUploadAdapterPlugin,
     Indent,
     IndentBlock,
     Italic,
     Link,
     List,
     Strikethrough,
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
     Autosave,
     TodoList,
    ],
    toolbar: [
     'undo',
     'redo',
     '|',
     'alignment',
     '|',
     'heading',
     '|',
     'bold',
     'italic',
     'underline',
     'strikethrough',
     'fontSize',
     'fontFamily',
     'fontColor',
     'fontBackgroundColor',
     'highlight',
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
     'todoList',
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
      {
       model: 'heading5',
       view: 'h5',
       title: 'Heading 5',
       class: 'ck-heading_heading5',
      },
      {
       model: 'heading6',
       view: 'h6',
       title: 'Heading 6',
       class: 'ck-heading_heading6',
      },
     ],
    },
    image: {
     insert: {
      integrations: ['upload', 'url'],
     },
     upload: {
      types: ['jpeg', 'png', 'gif', 'webp'],
     },
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
      '|',
      'uploadImage',
     ],
    },
    link: {
     addTargetToExternalLinks: true,
     defaultProtocol: 'https://',
     allowedProtocols: ['http://', 'https://', 'mailto:', 'tel:'],
    },
    table: {
     contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
   }}
   onReady={(editor) => {
    const toolbarElement = editor.ui.view.toolbar.element;
    editor.on('change:isReadOnly', (evt, propertyName, isReadOnly) => {
     if (isReadOnly) {
      if (toolbarElement) {
       toolbarElement.style.display = 'none';
      }
     } else {
      if (toolbarElement) {
       toolbarElement.style.display = 'flex';
      }
     }
    });
   }}
  />
 );
});

export default ContentEditor;
