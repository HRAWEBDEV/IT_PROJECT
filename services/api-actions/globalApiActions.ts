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
 blogCategoryName: string;
 blogStateID: number;
 blogStateName: string;
 craeteDateTime: string;
 showForCard: boolean;
};

type BlogState = {
 id: number;
 name: string;
};

// blogs actions
const blogsApi = '/blogs';
function getBlogs<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   blogStateID: number;
   blogCategoryID?: number;
   searchText?: string;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       Blogs: PagedResponse<Blog[]>;
      }
    : { Blogs: Blog[] }
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
 if (props.blogCategoryID) {
  params.append('blogCategoryID', props.blogCategoryID.toString());
 }
 if (props.searchText) {
  params.append('searchText', props.searchText);
 }
 params.append('blogStateID', props.blogStateID.toString());
 return axios.get(`${blogsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createBlog(
 props: ApiDefaultProps &
  Pick<Blog, 'blogCategoryID' | 'header' | 'description'> & {
   blogTags?: { tagID: number; lang: SupportedLocales; blogID: number }[];
  }
) {
 const newBlog = {
  blogCategoryID: props.blogCategoryID,
  header: props.header,
  description: props.description,
  body: 'writing',
  blogStateID: 1,
  lang: props.locale,
  blogTags: props.blogTags || null,
 };
 return axios.post(blogsApi, newBlog);
}
function updateBlog(
 props: ApiDefaultProps &
  Pick<Blog, 'blogCategoryID' | 'header' | 'description' | 'id' | 'body'> & {
   blogImage?: { imageUrl: string; lang: SupportedLocales; blogID: number };
  } & { blogTags?: { tagID: number; lang: SupportedLocales; blogID: number }[] }
) {
 const newBlog = {
  id: props.id,
  blogCategoryID: props.blogCategoryID,
  header: props.header,
  description: props.description,
  body: props.body,
  blogStateID: 1,
  lang: props.locale,
  blogImage: props.blogImage || null,
  blogTags: props.blogTags || null,
 };
 return axios.put(blogsApi, newBlog);
}

function patchBlog(
 props: ApiDefaultProps & {
  blogID: number;
  blogState?: number;
  isFour?: boolean;
 }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 if (props.blogState) {
  params.append('blogStateID', props.blogState.toString());
 }
 if (props.isFour !== undefined) {
  params.append('isFour', props.isFour.toString());
 }
 return axios.patch(`${blogsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}

function getBlog(props: ApiDefaultProps & { blogID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 return axios.get(`${blogsApi}/${props.blogID}?${params.toString()}`, {
  signal: props.signal,
 });
}
// function deleteBlog(props: ApiDefaultProps) {}
const getBlogTagsApi = '/blogTags';
function getBlogTags(
 props: ApiDefaultProps & { blogID: number; searchText?: string }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 if (props.searchText) {
  params.append('searchText', props.searchText);
 }
 return axios.get<
  ResponseShape<{ BlogTags: { tagID: number; tagName: string }[] }>
 >(`${getBlogTagsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
// blog states
const blogStatesApi = '/blogStates';
function getBlogStates(props: ApiDefaultProps) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 return axios.get<BlogState[]>(`${blogStatesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}

// blog images

const blogImagesApi = '/blogImages';
function getBlogImages(props: ApiDefaultProps & { blogID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 return axios.get<
  ResponseShape<{
   BlogImages: { imageUrl: string; blogID: number }[];
  }>
 >(`${blogImagesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createBlogImage(formData: FormData) {
 return axios.post<string>(blogImagesApi, formData, {
  headers: {
   'Content-Type': 'multipart/form-data',
  },
 });
}
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
    : { BlogCategories: BlogCategory[] }
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
function createBlogCategory(
 props: ApiDefaultProps & Pick<BlogCategory, 'name' | 'description'>
) {
 return axios.post(
  blogCategoriesApi,
  { ...props, lang: props.locale },
  { signal: props.signal }
 );
}
function updateBlogCategory(
 props: ApiDefaultProps & Pick<BlogCategory, 'name' | 'description' | 'id'>
) {
 return axios.put(
  blogCategoriesApi,
  { ...props, lang: props.locale },
  { signal: props.signal }
 );
}
function deleteBlogCategory(
 props: ApiDefaultProps & { blogCategoryID: BlogCategory['id'] }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogCategoryID', props.blogCategoryID.toString());
 return axios.delete(`${blogCategoriesApi}?${params.toString()}`);
}

// tags actions
const tagsApi = '/tags';
function getTags<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   tagTypeID: number;
   searchText?: string;
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
 if (props.searchText) {
  params.append('searchText', props.searchText);
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
 type ResponseShape,
 type TagCategory,
 type Tag,
 type BlogCategory,
 type Blog,
 type PagedResponse,
 type BlogState,
 getBlogs,
 getBlogCategories,
 getTags,
 getTagCategories,
 deleteTag,
 createTag,
 updateTag,
 deleteBlogCategory,
 createBlogCategory,
 updateBlogCategory,
 createBlog,
 updateBlog,
 getBlogImages,
 createBlogImage,
 getBlogTags,
 patchBlog,
 blogsApi,
 blogCategoriesApi,
 getBlogStates,
 getBlog,
};
