'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import ArticlesFilters from './ArticleFilters';
import {
 type Blog,
 getBlogCategories,
 getBlogs,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FilterSchema, filtersSchema } from '../schemas/filtersSchema';
import ArticlesGrid from './ArticlesGrid';
import { GridPaginationModel } from '@mui/x-data-grid';
import AddArticle from './AddArticle';

export default function ArticlesWrapper() {
 const [openEditArticle, setOpenEditArticle] = useState(false);
 const [selectedArticle, setSelectedArticle] = useState<Blog | null>(null);
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
 const { articles } = useWebsiteDictionary() as {
  articles: Dic;
 };

 const {
  data: articleCategories = [],
  isLoading: isArticleCategoriesLoading,
  isFetching: isArticleCategoriesFetching,
 } = useQuery({
  queryKey: ['dashboard', 'article-categories'],
  async queryFn() {
   const result = await getBlogCategories({
    locale,
   });
   const data = result.data.payload.BlogCategories;
   if (data.length) {
    filtersUseForm.setValue('category', {
     id: data[0].id.toString(),
     name: data[0].name,
    });
   }
   return data;
  },
 });

 const {
  data: articlesList = [],
  isLoading,
  isFetching,
 } = useQuery({
  queryKey: [
   'dashboard',
   'articles',
   pagination.page,
   pagination.pageSize,
   tagCategory?.id || '',
  ],
  enabled: !!filtersUseForm.getValues('category'),
  async queryFn() {
   const blogCategory = filtersUseForm.getValues('category');
   const result = await getBlogs({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page,
    },
    blogStateID: 1,
    blogCategoryID: Number(blogCategory.id),
   });
   const pacakge = result.data.payload.Blogs;
   const data = pacakge.rows;
   setRowCount(pacakge.rowsCount);
   return data;
  },
 });

 return (
  <div>
   <h1 className='font-bold text-2xl mb-4'>{articles.title as string}</h1>
   <FormProvider {...filtersUseForm}>
    <ArticlesFilters
     articleCategories={articleCategories}
     isLoadingCategories={
      isArticleCategoriesLoading || isArticleCategoriesFetching
     }
     setOpenAddArticle={() => setOpenEditArticle(true)}
    />
    <ArticlesGrid
     articlesList={articlesList}
     isLoading={isLoading || isFetching}
     pagination={pagination}
     setPagination={setPagination}
     rowCount={rowCount}
     setOpenAddArticle={() => setOpenEditArticle(true)}
     selectedArticle={selectedArticle}
     setSelectedArticle={setSelectedArticle}
    />
   </FormProvider>
   <AddArticle
    open={openEditArticle}
    article={selectedArticle}
    articleCategories={articleCategories}
    onClose={() => {
     setOpenEditArticle(false);
     setSelectedArticle(null);
    }}
   />
  </div>
 );
}
