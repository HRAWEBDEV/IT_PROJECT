'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import ArticlesFilters from './ArticleFilters';
import {
 type Blog,
 getBlogs,
 getBlogCategories,
 getBlogStates,
} from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/services/app-config/appConfig';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FilterSchema, filtersSchema } from '../schemas/filtersSchema';
import ArticlesGrid from './ArticlesGrid';
import { GridPaginationModel } from '@mui/x-data-grid';
import AddArticle from './AddArticle';
import AddCategory from '../../articles-categories/components/AddCategory';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddImage from './AddImage';
import AddContent from './AddContent';
import ChangeState from './ChangeState';

export default function ArticlesWrapper() {
 const [openChangeState, setOpenChangeState] = useState(false);
 const [openArticleContent, setOpenArticleContent] = useState(false);
 const [openAddImage, setOpenAddImage] = useState(false);
 const [openAddCategory, setOpenAddCategory] = useState(false);
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
 const [tagCategory, blogState] = watch(['category', 'state']);
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
  queryKey: ['dashboard', 'articlesCategories'],
  async queryFn() {
   const result = await getBlogCategories({
    locale,
   });
   const data = result.data.payload.BlogCategories;
   return data;
  },
 });

 const {
  data: articleStates = [],
  isLoading: isArticleStatesLoading,
  isFetching: isArticleStatesFetching,
 } = useQuery({
  queryKey: ['dashboard', 'articlesStates'],
  async queryFn() {
   const result = await getBlogStates({
    locale,
   });
   const data = result.data;
   if (data.length) {
    filtersUseForm.setValue('state', {
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
  enabled: !!filtersUseForm.getValues('state'),
  queryKey: [
   'dashboard',
   'articles',
   pagination.page + 1,
   pagination.pageSize,
   tagCategory?.id || '',
   blogState?.id || '',
  ],
  async queryFn() {
   const blogCategory = filtersUseForm.getValues('category');
   const blogState = filtersUseForm.getValues('state');
   const result = await getBlogs({
    locale,
    pagination: {
     limit: pagination.pageSize,
     offset: pagination.page + 1,
    },
    blogStateID: Number(blogState.id),
    blogCategoryID: blogCategory ? Number(blogCategory.id) : undefined,
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
     articleStates={articleStates}
     isLoadingCategories={
      isArticleCategoriesLoading || isArticleCategoriesFetching
     }
     isLoadingStates={isArticleStatesLoading || isArticleStatesFetching}
     setOpenAddArticle={() => setOpenEditArticle(true)}
     setOpenAddCategory={() => setOpenAddCategory(true)}
    />
    {articleCategories.length ? (
     <ArticlesGrid
      articlesList={articlesList}
      isLoading={isLoading || isFetching}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}
      setOpenAddArticle={() => setOpenEditArticle(true)}
      selectedArticle={selectedArticle}
      setSelectedArticle={setSelectedArticle}
      setShowAddImage={setOpenAddImage}
      setOpenArticleContent={() => setOpenArticleContent(true)}
      setOpenChangeState={() => setOpenChangeState(true)}
     />
    ) : (
     <div className='bg-background rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 min-h-[18rem] flex items-center justify-center flex-col'>
      <p className='text-center font-medium text-neutral-500 dark:text-neutral-400 text-lg'>
       {articles.atLeastOneCategory as string}
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
   <AddArticle
    open={openEditArticle}
    article={selectedArticle}
    articleCategories={articleCategories}
    onClose={() => {
     setOpenEditArticle(false);
     setSelectedArticle(null);
    }}
   />
   <AddCategory
    open={openAddCategory}
    category={null}
    onClose={() => setOpenAddCategory(false)}
   />
   {openArticleContent && selectedArticle && (
    <AddContent
     open={openArticleContent}
     onClose={() => setOpenArticleContent(false)}
     article={selectedArticle}
    />
   )}
   {openChangeState && selectedArticle && (
    <ChangeState
     open={openChangeState}
     onClose={() => setOpenChangeState(false)}
     article={selectedArticle}
     blogStates={articleStates}
    />
   )}
   {openAddImage && selectedArticle && (
    <AddImage
     open={openAddImage}
     article={selectedArticle}
     onClose={() => setOpenAddImage(false)}
    />
   )}
  </div>
 );
}
