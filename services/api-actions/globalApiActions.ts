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
type BlogTag = {
 tagID: number;
 tagName: string;
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
 createDateTimeOffset: string;
 showForCard: boolean;
 imageUrl?: string;
};

type BlogComment = {
 id: number;
 parentID: number | null;
 blogID: number;
 comment: string;
 commentStateID: number;
 commentStateName: string;
 lang: SupportedLocales;
 writerUserName: string;
 createDateTimeOffset: string;
 childs: BlogComment[] | null;
};

type BlogState = {
 id: number;
 name: string;
};

type User = {
 personID: number;
 userName: string;
 cellPhone: string | null;
 firstName: string;
 lastName: string;
 personFullName: string;
 email: string | null;
 profileImage: string | null;
 verified: boolean;
 disabled: boolean;
 blackList: boolean;
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
  Pick<
   Blog,
   | 'blogCategoryID'
   | 'header'
   | 'description'
   | 'id'
   | 'body'
   | 'blogStateID'
   | 'showForCard'
  > & {
   blogImage?: { imageUrl: string; lang: SupportedLocales; blogID: number };
  } & { blogTags?: { tagID: number; lang: SupportedLocales; blogID: number }[] }
) {
 const newBlog = {
  id: props.id,
  blogCategoryID: props.blogCategoryID,
  header: props.header,
  description: props.description,
  body: props.body,
  lang: props.locale,
  blogImage: props.blogImage || null,
  blogTags: props.blogTags || null,
  blogStateID: props.blogStateID,
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
 return axios.get<ResponseShape<{ BlogTags: BlogTag[] }>>(
  `${getBlogTagsApi}?${params.toString()}`,
  {
   signal: props.signal,
  }
 );
}
// blog comments
const blogCommentsApi = '/blogComments';
function getBlogComments(
 props: ApiDefaultProps & {
  blogID: number;
  isForHomepage?: boolean;
  commentStateID?: number;
 }
): Promise<AxiosResponse<ResponseShape<{ BlogComments: BlogComment[] }>>> {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 params.append(
  'isForHomePage',
  props.isForHomepage === undefined ? 'true' : props.isForHomepage.toString()
 );
 params.append(
  'isForDashboard',
  props.isForHomepage === undefined || props.isForHomepage ? 'false' : 'true'
 );
 if (props.commentStateID) {
  params.append('commentStateID', props.commentStateID.toString());
 }
 return axios.get(`${blogCommentsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createBlogComment(
 newComment: Omit<
  BlogComment,
  | 'childs'
  | 'writerUserName'
  | 'commentStateID'
  | 'commentStateName'
  | 'createDateTimeOffset'
 >
) {
 return axios.post(blogCommentsApi, newComment);
}
function updateBlogComment(
 newComment: Omit<
  BlogComment,
  'childs' | 'writerUserName' | 'commentStateName' | 'createDateTimeOffset'
 >
) {
 return axios.put(blogCommentsApi, newComment);
}
function deleteBlogComment({
 commentID,
 lang,
}: {
 commentID: number;
 lang: SupportedLocales;
}) {
 const params = new URLSearchParams();
 params.append('lang', lang);
 params.append('blogCommentID', commentID.toString());
 return axios.delete(`${blogCommentsApi}?${params.toString()}`);
}

function changeBlogCommentState(
 props: ApiDefaultProps & {
  blogCommentID: number;
 }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogCommentID', props.blogCommentID.toString());
 return axios.patch(`${blogCommentsApi}?${params.toString()}`, {
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
 props: ApiDefaultProps & T & { searchText?: string }
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
 if (props.searchText) {
  params.append('searchText', props.searchText);
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

//
const usersApi = '/users';
function getUsers<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   searchText?: string;
   verified?: boolean;
   disabled?: boolean;
   blackList?: boolean;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       Users: PagedResponse<User[]>;
      }
    : { Users: User[] }
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
 params.append(
  'verified',
  props.verified === undefined ? 'true' : props.verified.toString()
 );
 params.append(
  'disabled',
  props.disabled === undefined ? 'true' : props.disabled.toString()
 );
 params.append(
  'blackList',
  props.blackList === undefined ? 'true' : props.blackList.toString()
 );
 return axios.get(`${usersApi}?${params.toString()}`, {
  signal: props.signal,
 });
}

function getUser(
 props: ApiDefaultProps & { userID: number }
): Promise<AxiosResponse<ResponseShape<{ User: User }>>> {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 return axios.get(`${usersApi}/${props.userID}?${params.toString()}`, {
  signal: props.signal,
 });
}

function UpdateUser(newUser: User) {
 return axios.put(`${usersApi}`, newUser);
}

export {
 type ResponseShape,
 type TagCategory,
 type Tag,
 type BlogCategory,
 type Blog,
 type PagedResponse,
 type BlogState,
 type PaginationProps,
 type BlogComment,
 type User,
 type BlogTag,
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
 getBlogTagsApi,
 getBlogTags,
 patchBlog,
 blogsApi,
 blogCategoriesApi,
 getBlogStates,
 getBlog,
 getBlogComments,
 createBlogComment,
 updateBlogComment,
 deleteBlogComment,
 getUsers,
 getUser,
 UpdateUser,
 changeBlogCommentState,
};
