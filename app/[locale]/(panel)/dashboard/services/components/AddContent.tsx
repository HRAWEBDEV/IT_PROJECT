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
import {
 type Service,
 getServiceTags,
 updateService,
} from '@/services/api-actions/globalApiActions';
import dynamic from 'next/dynamic';
import { ClassicEditor } from 'ckeditor5';
import type { CKEditor as CKEditorType } from '@ckeditor/ckeditor5-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useAppConfig } from '@/services/app-config/appConfig';
import { AxiosError } from 'axios';
import { useHeightController } from '@/hooks/useHeightController';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';

const Editor = dynamic(
 () =>
  import('../../../../../../components/ck-editor/ContentEditor').then(
   (mod) => mod.default
  ),
 {
  ssr: false,
 }
);

type Props = {
 open: boolean;
 service: Service;
 onClose: () => void;
};

export default function AddContent({ open, onClose, service }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const titleRef = useRef<HTMLDivElement>(null);
 const actionsRef = useRef<HTMLDivElement>(null);
 const {} = useHeightController({
  enviromentRefs: [titleRef, actionsRef],
 });
 const { locale } = useAppConfig();
 const queryClient = useQueryClient();
 const { enqueueSnackbar } = useSnackbar();
 const [content, setContent] = useState(service.body);
 const editorRef = useRef<CKEditorType<ClassicEditor>>(null);
 const { services, errorTryAgainLater, changesSavedSuccessfully } =
  useWebsiteDictionary() as {
   services: Dic;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };

 const { mutate: updateArticle, isPending: isUpdating } = useMutation({
  async mutationFn() {
   const result = await getServiceTags({
    locale,
    serviceID: service!.id,
   });
   return updateService({
    locale,
    id: service.id,
    serviceCategoryID: service.serviceCategoryID,
    description: service.description,
    header: service.header,
    body: content,
    showForCard: service.showForCard,
    serviceStateID: service.serviceStateID,
    serviceTags: result.data.payload.ServiceTags.map((item) => ({
     tagID: item.tagID,
     lang: locale,
     serviceID: service.id,
    })),
   });
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'services'],
   });
   enqueueSnackbar({
    message: changesSavedSuccessfully as string,
    variant: 'success',
   });
   onClose();
  },
  onError(error: AxiosError) {
   enqueueSnackbar({
    message: (error.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
 });

 return (
  <Dialog
   ref={titleRef}
   disableEnforceFocus={true}
   open={open}
   fullScreen={!isLargeDevice}
   maxWidth='xl'
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
    updateArticle();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <div>
      <span className='text-base font-bold'>{services.content as string}</span>
      <span className='ms-4 text-primary font-medium'>{service.header}</span>
     </div>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='[&_.ck-content]:h-[26rem]'>
     <Editor
      type='service'
      ref={editorRef}
      data={content}
      onChange={(_, e) => {
       setContent(e.getData());
      }}
     />
    </div>
   </DialogContent>
   <DialogActions ref={actionsRef}>
    <Button
     className='w-[6rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
     disabled={isUpdating}
    >
     {services.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     disabled={isUpdating}
    >
     {services.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
