'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import ProjectsFilters from './ProjectsFilters';
import {
 type Project,
 getProjects,
 getProjectCategories,
 getProjectStates,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FilterSchema, filtersSchema } from '../schemas/filtersSchema';
import ProjectsGrid from './ProjectsGrid';
import { GridPaginationModel, GridFilterModel } from '@mui/x-data-grid';
import AddProject from './AddProject';
import AddCategory from '../../projects-categories/components/AddProjectCategory';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import AddImage from './AddImage';
// import AddContent from './AddContent';
// import ChangeState from './ChangeState';
// import ArticleComments from './comments/ArticleComments';
import { useAccessContext } from '../../services/access/accessContext';
import NoAccessGranted from '../../components/NoAccessGranted';
import AccessProvider from '../../services/access/AccessProvider';

export default function ArticlesWrapper() {
 const { roleAccess } = useAccessContext();
 const [filterModel, setFilterModel] = useState<GridFilterModel>({
  items: [],
 });
 const [openChangeState, setOpenChangeState] = useState(false);
 const [openProjectContent, setOpenProjectContent] = useState(false);
 const [openProjectComments, setOpenProjectComments] = useState(false);
 const [openAddImage, setOpenAddImage] = useState(false);
 const [openAddCategory, setOpenAddCategory] = useState(false);
 const [openEditProject, setOpenEditProject] = useState(false);
 const [selectedProject, setSelectedProject] = useState<Project | null>(null);
 const [rowCount, setRowCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 const filtersUseForm = useForm<FilterSchema>({
  resolver: zodResolver(filtersSchema),
 });
 const { watch } = filtersUseForm;
 const [tagCategory, blogState] = watch(['category', 'state']);
 //
 const { locale } = useAppConfig();
 const { projects } = useWebsiteDictionary() as {
  projects: Dic;
 };

 const {
  data: projectCategories = [],
  isLoading: isProjectCategoriesLoading,
  isFetching: isProjectCategoriesFetching,
 } = useQuery({
  queryKey: ['projects', 'projectsCategories'],
  async queryFn() {
   const result = await getProjectCategories({
    locale,
   });
   const data = result.data.payload.ProjectCategories;
   return data;
  },
 });

 const {
  data: projectStates = [],
  isLoading: isProjectStatesLoading,
  isFetching: isProjectStatesFetching,
 } = useQuery({
  queryKey: ['projects', 'projectsStates'],
  async queryFn() {
   const result = await getProjectStates({
    locale,
   });
   const data = result.data;
   if (data.length && !blogState) {
    filtersUseForm.setValue('state', {
     id: data[0].id.toString(),
     name: data[0].name,
    });
   }
   return data;
  },
 });

 const {
  data: projectsList = [],
  isLoading,
  isFetching,
 } = useQuery({
  enabled: !!filtersUseForm.getValues('state'),
  queryKey: [
   'dashboard',
   'projects',
   pagination.page + 1,
   pagination.pageSize,
   tagCategory?.id || '',
   blogState?.id || '',
   filterModel?.quickFilterValues?.[0] || '',
  ],
  async queryFn() {
   const projectCategory = filtersUseForm.getValues('category');
   const projectState = filtersUseForm.getValues('state');
   const result = await getProjects({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    projectStateID: Number(projectState.id),
    projectCategoryID: projectCategory ? Number(projectCategory.id) : undefined,
    searchText: filterModel?.quickFilterValues?.[0] || undefined,
    showForCards: false,
   });
   const pacakge = result.data.payload.Projects;
   const data = pacakge.rows;
   setRowCount(pacakge.rowsCount);
   return data;
  },
 });

 return (
  <>
   {true ? (
    <div>
     <h1 className='font-bold text-2xl mb-4'>{projects.title as string}</h1>
     <FormProvider {...filtersUseForm}>
      <ProjectsFilters
       projectCategories={projectCategories}
       projectStates={projectStates}
       isLoadingCategories={
        isProjectCategoriesLoading || isProjectCategoriesFetching
       }
       isLoadingStates={isProjectStatesLoading || isProjectStatesFetching}
       setOpenAddProject={() => setOpenEditProject(true)}
       setOpenAddCategory={() => setOpenAddCategory(true)}
      />
      {projectCategories.length ? (
       <ProjectsGrid
        projectsList={projectsList}
        setOpenProjectComments={() => setOpenProjectComments(true)}
        isLoading={isLoading || isFetching}
        pagination={pagination}
        setPagination={setPagination}
        rowCount={rowCount}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        setOpenAddProject={() => setOpenEditProject(true)}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        setShowAddImage={setOpenAddImage}
        setOpenProjectContent={() => setOpenProjectContent(true)}
        setOpenChangeState={() => setOpenChangeState(true)}
       />
      ) : (
       <div className='bg-background rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 min-h-[18rem] flex items-center justify-center flex-col'>
        <p className='text-center font-medium text-neutral-500 dark:text-neutral-400 text-lg'>
         {projects.atLeastOneCategory as string}
        </p>
        <IconButton
         color='secondary'
         onClick={() => setOpenAddCategory(true)}
         className='absolute top-2 right-2'
        >
         <AddBoxOutlinedIcon sx={{ fontSize: '3rem' }} />
        </IconButton>
       </div>
      )}
     </FormProvider>
     <AddProject
      open={openEditProject}
      project={selectedProject}
      projectCategories={projectCategories}
      onClose={() => {
       setOpenEditProject(false);
       setSelectedProject(null);
      }}
     />
     <AddCategory
      open={openAddCategory}
      category={null}
      onClose={() => {
       setOpenAddCategory(false);
      }}
     />
     {/* {openArticleContent && selectedArticle && (
      <AddContent
       open={openArticleContent}
       onClose={() => {
        setOpenArticleContent(false);
        setSelectedArticle(null);
       }}
       article={selectedArticle}
      />
     )}
     {openChangeState && selectedArticle && (
      <ChangeState
       open={openChangeState}
       onClose={() => {
        setSelectedArticle(null);
        setOpenChangeState(false);
       }}
       article={selectedArticle}
       blogStates={articleStates}
      />
     )}
     {openAddImage && selectedArticle && (
      <AddImage
       open={openAddImage}
       article={selectedArticle}
       onClose={() => {
        setOpenAddImage(false);
        setSelectedArticle(null);
       }}
      />
     )}
     {openArticleComments && selectedArticle && (
      <AccessProvider formTitle='articlesComments'>
       <ArticleComments
        open={openArticleComments}
        article={selectedArticle}
        onClose={() => {
         setOpenArticleComments(false);
        }}
       />
      </AccessProvider>
     )} */}
    </div>
   ) : (
    <NoAccessGranted />
   )}
  </>
 );
}
