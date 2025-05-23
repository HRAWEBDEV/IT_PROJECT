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
 type Project,
 type ProjectCategory,
 type Tag,
 createProject,
 updateProject,
 getTags,
 getProjectTags,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { addProjectSchema, type AddProjectSchema } from '../schemas/addProject';
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

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
type Props = {
 open: boolean;
 project: Project | null;
 projectCategories: ProjectCategory[];
 onClose: () => void;
};

export default function AddProject({
 open,
 project,
 projectCategories,
 onClose,
}: Props) {
 const [tagOnce, setTagOnce] = useState(false);
 const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
 const { enqueueSnackbar } = useSnackbar();
 const { locale } = useAppConfig();
 const { projects, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   projects: Dic;
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
  };
 const queryClient = useQueryClient();

 const {
  data: tags = [],
  isLoading: isLoadingTags,
  isFetching: isFetchingTags,
 } = useQuery({
  queryKey: ['tags', project?.id],
  queryFn: async () => {
   const result = await getTags({
    locale,
    tagTypeID: 1,
   });
   const tags = result.data.payload.Tags;
   if (project && project.id && !tagOnce) {
    const result = await getProjectTags({
     locale,
     projectID: project!.id,
    });
    const projectTags = result.data.payload.ProjectTags;
    setSelectedTags(
     tags.filter((item) => projectTags.some((b) => b.tagID === item.id))
    );
    setTagOnce(true);
   }
   return tags;
  },
 });

 const { mutate: mutateTag, isPending: isCreating } = useMutation({
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: ['dashboard', 'projects'],
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
  async mutationFn(data: AddProjectSchema) {
   const tagProjects = selectedTags.map((item) => ({
    projectID: project?.id || 0,
    tagID: item.id,
    lang: locale,
   }));
   const newProject = {
    id: project?.id || 0,
    locale,
    projectCategoryID: Number(data.category.id),
    header: data.title,
    description: data.description,
    body: project?.body || '',
    projectTags: tagProjects,
   };
   return project
    ? updateProject({
       ...newProject,
       projectStateID: project.projectStateID,
       showForCard: project.showForCard,
      })
    : createProject(newProject);
  },
 });
 const {
  control,
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<AddProjectSchema>({
  resolver: zodResolver(addProjectSchema),
  defaultValues: {
   title: '',
  },
 });

 useEffect(() => {
  setTagOnce(false);
  setSelectedTags([]);
  if (project) {
   setValue('title', project.header);
   setValue('description', project.description);
   setValue('category', {
    id: project.projectCategoryID.toString(),
    name: project.projectCategoryName,
   });
  } else {
   if (!projectCategories.length) return;
   setValue('title', '');
   setValue('description', '');
   setValue('category', {
    id: projectCategories[0].id.toString(),
    name: projectCategories[0].name,
   });
  }
 }, [project, projectCategories, setValue, open]);

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
      {project
       ? (projects.editProject as string)
       : (projects.addProject as string)}
     </span>
     <IconButton loading={isCreating} color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <div className='grid gap-4'>
     <Controller
      control={control}
      name='category'
      render={({ field }) => (
       <Autocomplete
        {...field}
        disableClearable={true}
        value={field.value || null}
        onChange={(_, newValue) => field.onChange(newValue)}
        size='small'
        options={projectCategories.map((item) => ({
         id: item.id.toString(),
         name: item.name,
        }))}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
         <TextField
          {...params}
          label={projects.category as string}
          error={!!errors.category}
          required
         />
        )}
       />
      )}
     />
     <TextField
      size='small'
      label={projects.projectTitle as string}
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
       <TextField {...params} label={projects.tags as string} />
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
      label={projects.description as string}
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
     {projects.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isCreating || isFetchingTags || isLoadingTags}
    >
     {projects.save as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
