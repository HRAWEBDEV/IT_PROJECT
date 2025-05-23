'use client';
import ProjectsFilters from './ProjectsFilters';
import ProjectsList from './ProjectsList';
import Pagination from '@mui/material/Pagination';
import { type WithDictionary } from '@/localization/locales';
import {
 getProjectCategories,
 getProjects,
 type Project,
} from '@/services/api-actions/globalApiActions';
import { paginationLimit } from '../../utils/blogsPaginationInfo';
import { GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { useAppConfig } from '@/services/app-config/appConfig';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import {
 type ProjectsFilters as ProjectsFiltersSchema,
 projectsFiltersSchema,
} from '../../schemas/projectsFilters';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

type Props = {
 serverProjects: Project[];
} & WithDictionary;

export default function Projects({ dic, serverProjects }: Props) {
 const filtersRef = useRef<HTMLDivElement>(null);
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const { locale } = useAppConfig();
 const [rowsCount, setRowsCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 1,
  pageSize: paginationLimit,
 });
 const filtersUseForm = useForm<ProjectsFiltersSchema>({
  resolver: zodResolver(projectsFiltersSchema),
  defaultValues: {
   search: '',
   category: null,
  },
 });
 const searchValue = filtersUseForm.watch('search');
 const projectCategory = filtersUseForm.watch('category');
 const dbSearchValue = useDebounceValue(searchValue, 200);

 const {
  data: projectCategories = [],
  isLoading: projectCategoriesLoading,
  isFetching: projectCategoriesFetching,
 } = useQuery({
  queryKey: ['projectCategories'],
  async queryFn() {
   const result = await getProjectCategories({
    locale,
   });
   const data = result.data.payload.ProjectCategories;
   return data;
  },
 });

 const {
  data: projects = serverProjects,
  isLoading: projectsLoading,
  isFetching: projectsFetching,
 } = useQuery({
  queryKey: [
   'projects',
   dbSearchValue,
   projectCategory?.id,
   pagination.page,
   pagination.pageSize,
  ],
  async queryFn() {
   const result = await getProjects({
    locale,
    showForCards: false,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page,
    },
    searchText: dbSearchValue,
    projectStateID: 2,
    projectCategoryID: projectCategory ? Number(projectCategory.id) : undefined,
   });
   const pacakge = result.data.payload.Projects;
   const data = pacakge.rows;
   setRowsCount(pacakge.rowsCount);
   return data;
  },
 });

 useEffect(() => {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set('categoryID', projectCategory?.id || '');
  newSearchParams.set('categoryName', projectCategory?.name || '');
  if (pagination.page) newSearchParams.set('page', pagination.page.toString());
  router.push(`${pathname}?${newSearchParams.toString()}`, {
   scroll: false,
  });
 }, [
  pathname,
  router,
  dbSearchValue,
  projectCategory,
  pagination.page,
  searchParams,
 ]);

 useEffect(() => {
  const categoryID = searchParams.get('categoryID');
  const categoryName = searchParams.get('categoryName');
  const page = searchParams.get('page');
  filtersUseForm.setValue(
   'category',
   categoryID && categoryName ? { id: categoryID, name: categoryName } : null
  );
  if (page) setPagination((prev) => ({ ...prev, page: Number(page) }));
 }, [searchParams, filtersUseForm]);

 return (
  <section>
   <ProjectsFilters dic={dic} />
   <ProjectsList dic={dic} />
   {rowsCount > paginationLimit && (
    <div className='flex justify-center mb-8 text-lg font-medium'>
     <Pagination
      size='large'
      shape='rounded'
      count={Math.ceil(rowsCount / pagination.pageSize)}
      page={pagination.page}
      onChange={(_, value) => {
       setPagination({ ...pagination, page: value });
      }}
      color='secondary'
      sx={{
       '& .MuiButtonBase-root': {
        fontSize: 'inherit',
       },
      }}
     />
    </div>
   )}
  </section>
 );
}
