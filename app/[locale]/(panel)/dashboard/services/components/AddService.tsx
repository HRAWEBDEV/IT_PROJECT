import { useEffect, useState } from 'react';
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
 type ServiceCategory,
 type Tag,
 createService,
 updateService,
 getTags,
 getServiceTags,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { addServiceSchema, type AddServiceSchema } from '../schemas/addService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useSnackbar } from 'notistack';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AxiosError } from 'axios';
import AddIcon from './AddIcon';
import DeleteIcon from '@mui/icons-material/Delete';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
type Props = {
 open: boolean;
 service: Service | null;
 serviceCategories: ServiceCategory[];
 onClose: () => void;
};

export default function AddArticle({
 open,
 service,
 serviceCategories,
 onClose,
}: Props) {
 const [iconsSvg, setIconsSvg] = useState<string>('');
 const [showAddIcon, setShowAddIcon] = useState(false);
 const [tagOnce, setTagOnce] = useState(false);
 const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { services, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   services: Dic;
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
  };
 const queryClient = useQueryClient();

 const {
  data: tags = [],
  isLoading: isLoadingTags,
  isFetching: isFetchingTags,
 } = useQuery({
  queryKey: ['tags', service?.id],
  queryFn: async () => {
   const result = await getTags({
    locale,
    tagTypeID: 2,
   });
   const tags = result.data.payload.Tags;
   if (service && service.id && !tagOnce) {
    const result = await getServiceTags({
     locale,
     serviceID: service!.id,
    });
    const serviceTags = result.data.payload.ServiceTags;
    setSelectedTags(
     tags.filter((item) => serviceTags.some((b) => b.tagID === item.id))
    );
    setTagOnce(true);
   }
   return tags;
  },
 });

 const { mutate: mutateTag, isPending: isCreating } = useMutation({
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
  onError(erro: AxiosError) {
   enqueueSnackbar({
    message: (erro.response?.data as string) || errorTryAgainLater,
    variant: 'error',
   });
  },
  async mutationFn(data: AddServiceSchema) {
   const tagServices = selectedTags.map((item) => ({
    serviceID: service?.id || 0,
    tagID: item.id,
    lang: locale,
   }));
   const newService = {
    locale,
    serviceCategoryID: Number(data.category.id),
    header: data.title,
    description: data.description,
    body: service?.body || '',
    serviceTags: tagServices,
    svgUrl: iconsSvg,
   };
   return service
    ? updateService({
       id: service.id,
       ...newService,
       serviceStateID: service.serviceStateID,
       showForCard: service.showForCard,
       serviceImage: service.imageUrl
        ? {
           imageUrl: service.imageUrl,
           lang: locale,
           serviceID: service.id,
          }
        : undefined,
      })
    : createService(newService);
  },
 });
 const {
  control,
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<AddServiceSchema>({
  resolver: zodResolver(addServiceSchema),
  defaultValues: {
   title: '',
  },
 });

 useEffect(() => {
  setTagOnce(false);
  setSelectedTags([]);
  if (service) {
   setValue('title', service.header);
   setValue('description', service.description);
   setValue('category', {
    id: service.serviceCategoryID.toString(),
    name: service.serviceCategoryName,
   });
  } else {
   if (!serviceCategories.length) return;
   setValue('title', '');
   setValue('description', '');
   setValue('category', {
    id: serviceCategories[0].id.toString(),
    name: serviceCategories[0].name,
   });
  }
 }, [service, serviceCategories, setValue, open]);

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='sm'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
    handleSubmit((data) => {
     mutateTag(data);
    })();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>
      {service
       ? (services.editService as string)
       : (services.addService as string)}
     </span>
     <IconButton loading={isCreating} color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    {iconsSvg && (
     <div className='flex items-center justify-center mb-4 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 text-neutral-500 dark:text-neutral-400 relative'>
      <i className={`${iconsSvg} text-[4rem]`}></i>
      <div className='absolute top-0 end-0'>
       <IconButton onClick={() => setIconsSvg('')}>
        <DeleteIcon color='error' />
       </IconButton>
      </div>
     </div>
    )}
    <div className='grid gap-4'>
     <div className='flex gap-4'>
      <Controller
       control={control}
       name='category'
       render={({ field }) => (
        <Autocomplete
         className='flex-grow'
         {...field}
         disableClearable={true}
         value={field.value || null}
         onChange={(_, newValue) => field.onChange(newValue)}
         size='small'
         options={serviceCategories.map((item) => ({
          id: item.id.toString(),
          name: item.name,
         }))}
         getOptionLabel={(option) => option.name}
         renderInput={(params) => (
          <TextField
           {...params}
           label={services.category as string}
           error={!!errors.category}
           required
          />
         )}
        />
       )}
      />
      <Button variant='outlined' onClick={() => setShowAddIcon(true)}>
       {services.addIcon as string}
      </Button>
     </div>
     <TextField
      size='small'
      label={services.serviceTitle as string}
      {...register('title')}
      error={!!errors.title}
      helperText={errors.title?.message}
      required
     />
     <Autocomplete
      multiple
      loading={isLoadingTags || isFetchingTags}
      size='small'
      value={selectedTags}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => setSelectedTags(newValue)}
      getOptionLabel={(option) => option.name}
      options={tags}
      renderInput={(params) => (
       <TextField {...params} label={services.tags as string} />
      )}
      renderOption={(props, option, { selected }) => {
       const { key, ...optionProps } = props;
       return (
        <li key={key} {...optionProps}>
         <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
         />
         {option.name}
        </li>
       );
      }}
     />
     <TextField
      size='small'
      multiline
      rows={5}
      label={services.description as string}
      {...register('description')}
      error={!!errors.description}
      helperText={errors.description?.message}
      required
     />
    </div>
   </DialogContent>
   <DialogActions>
    <Button
     loading={isCreating}
     className='w-[6rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
    >
     {services.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating || isFetchingTags || isLoadingTags}
    >
     {services.save as string}
    </Button>
   </DialogActions>
   <AddIcon
    open={showAddIcon}
    onClose={() => setShowAddIcon(false)}
    setIcon={setIconsSvg}
   />
  </Dialog>
 );
}
