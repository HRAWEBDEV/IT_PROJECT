import { type AxiosResponse } from 'axios';
import { axios } from '../axios/axios';
import { SupportedLocales } from '@/localization/locales';

type ApiDefaultProps = {
 locale: SupportedLocales;
 signal?: AbortSignal;
};
type PagedResponse<T> = {
 rows: T;
 limit: number;
 offset: number;
 rowsCount: number;
};
type ResponseShape<T> = {
 payload: T;
 message: string | null;
 success: boolean;
 isEmpty: boolean;
};
type PaginationProps = {
 limit: number;
 offset: number;
};
type TagCategory = {
 id: number;
 name: string;
};
type Tag = {
 id: number;
 name: string;
 tagTypeID: number;
 tagTypeName: string;
};
type BlogCategory = {
 id: number;
 name: string;
 description: string;
};
type Blog = {
 id: number;
 header: string;
 description: string;
 body: string;
 blogCategoryID: number;
 blogStateName: string;
 craeteDateTime: string;
};

// blogs actions
const blogsApi = '/blogs';
function getBlogs<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   blogStateID: number;
   blogCategoryID: number;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       blogs: PagedResponse<Blog[]>;
      }
    : Blog[]
  >
 >
> {
 const { pagination } = props;
 const params = new URLSearchParams();
 if (pagination) {
  params.append('limit', pagination.limit.toString());
  params.append('offset', pagination.offset.toString());
 }
 params.append('blogStateID', props.blogStateID.toString());
 params.append('blogCategoryID', props.blogCategoryID.toString());
 return axios.get(`${blogsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
// function createBlog(props: ApiDefaultProps) {}
// function updateBlog(props: ApiDefaultProps) {}
// function deleteBlog(props: ApiDefaultProps) {}
// blog categories actions
const blogCategoriesApi = '/blog-categories';
function getBlogCategories<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps & T
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       BlogCategories: PagedResponse<BlogCategory[]>;
      }
    : BlogCategory[]
  >
 >
> {
 const { pagination } = props;
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 if (pagination) {
  params.append('limit', pagination.limit.toString());
  params.append('offset', pagination.offset.toString());
 }
 return axios.get(`${blogCategoriesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
// function createBlogCategory(props: ApiDefaultProps) {}
// function updateBlogCategory(props: ApiDefaultProps) {}
// function deleteBlogCategory(props: ApiDefaultProps) {}

// tags actions
const tagsApi = '/tags';
function getTags<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   tagTypeID: number;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       Tags: PagedResponse<Tag[]>;
      }
    : { Tags: Tag[] }
  >
 >
> {
 const { pagination } = props;
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 if (pagination) {
  params.append('limit', pagination.limit.toString());
  params.append('offset', pagination.offset.toString());
 }
 params.append('tagTypeID', props.tagTypeID.toString());
 return axios.get(`${tagsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createTag(props: ApiDefaultProps & Pick<Tag, 'name' | 'tagTypeID'>) {
 return axios.post(
  tagsApi,
  { ...props, lang: props.locale },
  {
   signal: props.signal,
  }
 );
}
function updateTag(
 props: ApiDefaultProps & Pick<Tag, 'name' | 'tagTypeID' | 'id'>
) {
 return axios.put(
  tagsApi,
  { ...props, lang: props.locale },
  {
   signal: props.signal,
  }
 );
}
function deleteTag(props: ApiDefaultProps & { tagID: Tag['id'] }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('tagID', props.tagID.toString());
 return axios.delete(`${tagsApi}?${params.toString()}`);
}

// tag categories actions
const tagCategoriesApi = '/tagTypes';
function getTagCategories(props: ApiDefaultProps) {
 return axios.get<
  ResponseShape<{
   TagTypes: TagCategory[];
  }>
 >(tagCategoriesApi, {
  signal: props.signal,
 });
}

export {
 type TagCategory,
 type Tag,
 type BlogCategory,
 type Blog,
 getBlogs,
 getBlogCategories,
 getTags,
 getTagCategories,
 deleteTag,
 createTag,
 updateTag,
};
