'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TagsFilters from './TagsFilters';
import {
 type Tag,
 getTagCategories,
 getTags,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FilterSchema, filtersSchema } from '../schemas/filtersSchema';
import TagsGrid from './TagsGrid';
import { GridPaginationModel, GridFilterModel } from '@mui/x-data-grid';
import AddTag from './AddTag';
import { useAccessContext } from '../../services/access/accessContext';
import NoAccessGranted from '../../components/NoAccessGranted';

export default function TagsWrapper() {
 const { roleAccess } = useAccessContext();
 const [filterModel, setFilterModel] = useState<GridFilterModel>({
  items: [],
 });
 const [openEditTag, setOpenEditTag] = useState(false);
 const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
 const [rowCount, setRowCount] = useState(0);
 const [pagination, setPagination] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
 });
 const filtersUseForm = useForm<FilterSchema>({
  resolver: zodResolver(filtersSchema),
 });
 const { watch } = filtersUseForm;
 const tagCategory = watch('category');
 //
 const { locale } = useAppConfig();
 const { tags } = useWebsiteDictionary() as {
  tags: Dic;
 };

 const {
  data: tagCategories = [],
  isLoading: isTagCategoriesLoading,
  isFetching: isTagCategoriesFetching,
 } = useQuery({
  queryKey: ['dashboard', 'tag-categories'],
  async queryFn() {
   const result = await getTagCategories({
    locale,
   });
   const data = result.data.payload.TagTypes;
   if (data.length && !tagCategory) {
    filtersUseForm.setValue('category', {
     id: data[0].id.toString(),
     name: data[0].name,
    });
   }
   return data;
  },
 });

 const {
  data: tagsList = [],
  isLoading,
  isFetching,
 } = useQuery({
  queryKey: [
   'dashboard',
   'tags',
   pagination.page + 1,
   pagination.pageSize,
   tagCategory?.id || '',
   filterModel?.quickFilterValues?.[0] || '',
  ],
  enabled: !!filtersUseForm.getValues('category'),
  async queryFn() {
   const tagCategory = filtersUseForm.getValues('category');
   const result = await getTags({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    tagTypeID: Number(tagCategory!.id),
    searchText: filterModel?.quickFilterValues?.[0] || undefined,
   });
   const pacakge = result.data.payload.Tags;
   const data = pacakge.rows;
   setRowCount(pacakge.rowsCount);
   return data;
  },
 });

 return (
  <>
   {roleAccess.read ? (
    <div>
     <h1 className='font-bold text-2xl mb-4'>{tags.title as string}</h1>
     <FormProvider {...filtersUseForm}>
      <TagsFilters
       tagCategories={tagCategories}
       isLoadingCategories={isTagCategoriesLoading || isTagCategoriesFetching}
       setOpenAddTag={() => setOpenEditTag(true)}
      />
      <TagsGrid
       filterModel={filterModel}
       setFilterModel={setFilterModel}
       tagsList={tagsList}
       isLoading={isLoading || isFetching}
       pagination={pagination}
       setPagination={setPagination}
       rowCount={rowCount}
       setOpenAddTag={() => setOpenEditTag(true)}
       selectedTag={selectedTag}
       setSelectedTag={setSelectedTag}
      />
     </FormProvider>
     <AddTag
      open={openEditTag}
      tag={selectedTag}
      tagCategories={tagCategories}
      defaultCategory={tagCategory}
      onClose={() => {
       setOpenEditTag(false);
       setSelectedTag(null);
      }}
     />
    </div>
   ) : (
    <NoAccessGranted />
   )}
  </>
 );
}
