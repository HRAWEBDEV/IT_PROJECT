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
type AboutUs = {
 name: string;
} | null;
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
 interested: boolean;
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
 createDateTimeOffset: string;
};

// projects
type Project = {
 id: number;
 header: string;
 description: string;
 body: string;
 projectCategoryID: number;
 projectCategoryName: string;
 projectStateID: number;
 projectStateName: string;
 createDateTimeOffset: string;
 showForCard: boolean;
 imageUrl?: string;
};
type ProjectCategory = {
 id: number;
 name: string;
 description: string;
};
type ProjectState = {
 id: number;
 name: string;
};
type ProjectTag = {
 tagID: number;
 tagName: string;
};
//
type Social = {
 id: number;
 link: string | null;
 name: string;
};
// services
type Service = {
 id: number;
 header: string;
 description: string;
 body: string;
 serviceCategoryID: number;
 serviceCategoryName: string;
 serviceStateID: number;
 serviceStateName: string;
 createDateTimeOffset: string;
 showForCard: boolean;
 imageUrl?: string;
};
type ServiceCategory = {
 id: number;
 name: string;
 description: string;
 svgUrl: string;
};
type ServiceState = {
 id: number;
 name: string;
};
type ServiceTag = {
 tagID: number;
 tagName: string;
};
// contact us
type ContactUs = {
 id: number;
 personID: number;
 firstName: string;
 lastName: string;
 cellPhone: string;
 email: string | null;
 isRead: boolean;
 deleted: boolean;
 description: string;
};

// blogs actions
const blogsApi = '/blogs';
function getBlogs<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   blogStateID: number;
   blogCategoryID?: number;
   interested?: boolean;
   searchText?: string;
   tagID?: number;
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
 if (props.tagID) {
  params.append('tagID', props.tagID.toString());
 }
 params.append('blogStateID', props.blogStateID.toString());
 if (props.interested !== undefined) {
  params.append('interested', props.interested.toString());
 }
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
  dashboard?: boolean;
  commentStateID?: number;
 }
): Promise<AxiosResponse<ResponseShape<{ BlogComments: BlogComment[] }>>> {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 params.append(
  'dashboard',
  props.dashboard === undefined ? 'false' : props.dashboard.toString()
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
  | 'interested'
 >
) {
 return axios.post(blogCommentsApi, newComment);
}
function updateBlogComment(
 newComment: Omit<
  BlogComment,
  | 'childs'
  | 'writerUserName'
  | 'commentStateName'
  | 'createDateTimeOffset'
  | 'interested'
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

const blogInterestedApi = '/blogInterested';
const toggleBlogInterested = (props: ApiDefaultProps & { blogID: number }) => {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('blogID', props.blogID.toString());
 return axios.post(`${blogInterestedApi}?${params.toString()}`);
};
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

function updateUserImage(formData: FormData) {
 return axios.post<string>(usersApi, formData, {
  headers: {
   'Content-Type': 'multipart/form-data',
  },
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

function updateUser(newUser: User) {
 return axios.put(`${usersApi}`, newUser);
}

function changeUserState(props: {
 userID: number;
 disabled?: boolean;
 blackList?: boolean;
}) {
 const params = new URLSearchParams();
 params.append('userID', props.userID.toString());
 if (props.disabled !== undefined) {
  params.append('disabled', props.disabled.toString());
 }
 if (props.blackList !== undefined) {
  params.append('blackList', props.blackList.toString());
 }
 return axios.patch(`/Users/UserStateChanger?${params.toString()}`);
}
// projects
const projectsApi = '/projects';
function getProjects<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   projectStateID: number;
   projectCategoryID?: number;
   searchText?: string;
   showForCards: boolean;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       Projects: PagedResponse<Project[]>;
      }
    : { Project: Project[] }
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
 if (props.projectCategoryID) {
  params.append('projectCategoryID', props.projectCategoryID.toString());
 }
 if (props.searchText) {
  params.append('searchText', props.searchText);
 }
 params.append('projectStateID', props.projectStateID.toString());
 params.append('showForCard', props.showForCards.toString());
 return axios.get(`${projectsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createProject(
 props: ApiDefaultProps &
  Pick<Project, 'projectCategoryID' | 'header' | 'description'> & {
   projectTags?: { tagID: number; lang: SupportedLocales; projectID: number }[];
  }
) {
 const newProject = {
  id: 0,
  projectCategoryID: props.projectCategoryID,
  header: props.header,
  description: props.description,
  body: 'writing',
  projectStateID: 1,
  lang: props.locale,
  projectTags: props.projectTags || null,
 };
 return axios.post(projectsApi, newProject);
}
function updateProject(
 props: ApiDefaultProps &
  Pick<
   Project,
   | 'projectCategoryID'
   | 'header'
   | 'description'
   | 'id'
   | 'body'
   | 'projectStateID'
   | 'showForCard'
  > & {
   projectImage?: {
    imageUrl: string;
    lang: SupportedLocales;
    projectID: number;
   };
  } & {
   projectTags?: { tagID: number; lang: SupportedLocales; projectID: number }[];
  }
) {
 const newProject = {
  projectCategoryID: props.projectCategoryID,
  header: props.header,
  description: props.description,
  body: props.body,
  projectStateID: props.projectStateID,
  lang: props.locale,
  projectTags: props.projectTags || null,
  id: props.id,
  projectImage: props.projectImage || null,
 };
 return axios.put(projectsApi, newProject);
}

function patchProject(
 props: ApiDefaultProps & {
  projectID: number;
  projectStateID?: number;
  isFour?: boolean;
 }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('projectID', props.projectID.toString());
 if (props.projectStateID) {
  params.append('projectStateID', props.projectStateID.toString());
 }
 if (props.isFour !== undefined) {
  params.append('isFour', props.isFour.toString());
 }
 return axios.patch(`${projectsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}

function getProject(props: ApiDefaultProps & { projectID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('projectID', props.projectID.toString());
 return axios.get(`${projectsApi}/${props.projectID}?${params.toString()}`, {
  signal: props.signal,
 });
}

// project images
const projectImagesApi = 'projectImages';
function getProjectImages(props: ApiDefaultProps & { projectID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('projectID', props.projectID.toString());
 return axios.get<
  ResponseShape<{
   ProjectImages: { imageUrl: string; projectID: number }[];
  }>
 >(`${projectImagesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createProjectImage(formData: FormData) {
 return axios.post<string>(projectImagesApi, formData, {
  headers: {
   'Content-Type': 'multipart/form-data',
  },
 });
}
// project categories
const projectCategoriesApi = '/project-categories';
function getProjectCategories<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   searchText?: string;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       ProjectCategories: PagedResponse<ProjectCategory[]>;
      }
    : { ProjectCategories: ProjectCategory[] }
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
 return axios.get(`${projectCategoriesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createProjectCategory(
 props: ApiDefaultProps & Pick<ProjectCategory, 'id' | 'name' | 'description'>
) {
 const newProjectCategory = {
  id: props.id,
  lang: props.locale,
  name: props.name,
  description: props.description,
 };
 return axios.post(projectCategoriesApi, newProjectCategory);
}
function updateProjectCategory(
 props: ApiDefaultProps & Pick<ProjectCategory, 'id' | 'name' | 'description'>
) {
 const newProjectCategory = {
  id: props.id,
  lang: props.locale,
  name: props.name,
  description: props.description,
 };
 return axios.put(projectCategoriesApi, newProjectCategory);
}

function deleteProjectCategory(
 props: ApiDefaultProps & {
  projectCategoryID: number;
 }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('projectCategoryID', props.projectCategoryID.toString());
 return axios.delete(`${projectCategoriesApi}?${params.toString()}`);
}
// project state
const projecteStatesApi = '/projectStates';
function getProjectStates(
 props: ApiDefaultProps
): Promise<AxiosResponse<ProjectState[]>> {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 return axios.get(`${projecteStatesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
// projects tags
const projectTagsApi = '/projectTags';
function getProjectTags(props: ApiDefaultProps & { projectID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('projectID', props.projectID.toString());
 return axios.get<ResponseShape<{ ProjectTags: ProjectTag[] }>>(
  `${projectTagsApi}?${params.toString()}`,
  {
   signal: props.signal,
  }
 );
}
// services
const servicesApi = '/services';
function getServices<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   serviceStateID: number;
   serviceCategoryID?: number;
   searchText?: string;
   showForCards: boolean;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       Services: PagedResponse<Service[]>;
      }
    : { Services: Service[] }
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
 if (props.serviceCategoryID) {
  params.append('serviceCategoryID', props.serviceCategoryID.toString());
 }
 if (props.searchText) {
  params.append('searchText', props.searchText);
 }
 params.append('serviceStateID', props.serviceStateID.toString());
 params.append('showForCard', props.showForCards.toString());
 return axios.get(`${servicesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createService(
 props: ApiDefaultProps &
  Pick<Service, 'serviceCategoryID' | 'header' | 'description'> & {
   serviceTags?: { tagID: number; lang: SupportedLocales; serviceID: number }[];
  }
) {
 const newService = {
  id: 0,
  serviceCategoryID: props.serviceCategoryID,
  header: props.header,
  description: props.description,
  body: 'writing',
  serviceStateID: 1,
  lang: props.locale,
  serviceTags: props.serviceTags || null,
 };
 return axios.post(servicesApi, newService);
}
function updateService(
 props: ApiDefaultProps &
  Pick<
   Service,
   | 'serviceCategoryID'
   | 'header'
   | 'description'
   | 'id'
   | 'body'
   | 'serviceStateID'
   | 'showForCard'
  > & {
   serviceImage?: {
    imageUrl: string;
    lang: SupportedLocales;
    serviceID: number;
   };
  } & {
   serviceTags?: { tagID: number; lang: SupportedLocales; serviceID: number }[];
  }
) {
 const newService = {
  serviceCategoryID: props.serviceCategoryID,
  header: props.header,
  description: props.description,
  body: props.body,
  serviceStateID: props.serviceStateID,
  lang: props.locale,
  serviceTags: props.serviceTags || null,
  id: props.id,
  serviceImage: props.serviceImage || null,
 };
 return axios.put(servicesApi, newService);
}

function patchService(
 props: ApiDefaultProps & {
  serviceID: number;
  serviceStateID?: number;
  isFour?: boolean;
 }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('serviceID', props.serviceID.toString());
 if (props.serviceStateID) {
  params.append('serviceStateID', props.serviceStateID.toString());
 }
 if (props.isFour !== undefined) {
  params.append('isFour', props.isFour.toString());
 }
 return axios.patch(`${servicesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}

function getService(props: ApiDefaultProps & { serviceID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('serviceID', props.serviceID.toString());
 return axios.get(`${servicesApi}/${props.serviceID}?${params.toString()}`, {
  signal: props.signal,
 });
}
//
const serviceImageApi = 'serviceImages';
function getServiceImages(props: ApiDefaultProps & { serviceID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('serviceID', props.serviceID.toString());
 return axios.get<
  ResponseShape<{
   ServiceImages: { imageUrl: string; serviceID: number }[];
  }>
 >(`${serviceImageApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createServiceImage(formData: FormData) {
 return axios.post<string>(serviceImageApi, formData, {
  headers: {
   'Content-Type': 'multipart/form-data',
  },
 });
}

// service categories
const serviceCategoriesApi = '/service-categories';
function getServiceCategories<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   searchText?: string;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       ServiceCategories: PagedResponse<ServiceCategory[]>;
      }
    : { ServiceCategories: ServiceCategory[] }
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
 return axios.get(`${serviceCategoriesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
function createServiceCategory(
 props: ApiDefaultProps &
  Pick<ServiceCategory, 'id' | 'name' | 'description' | 'svgUrl'>
) {
 const newServiceCategory = {
  id: props.id,
  lang: props.locale,
  name: props.name,
  description: props.description,
  svgUrl: props.svgUrl,
 };
 return axios.post(serviceCategoriesApi, newServiceCategory);
}
function updateServiceCategory(
 props: ApiDefaultProps &
  Pick<ServiceCategory, 'id' | 'name' | 'description' | 'svgUrl'>
) {
 const newServiceCategory = {
  id: props.id,
  lang: props.locale,
  name: props.name,
  description: props.description,
  svgUrl: props.svgUrl,
 };
 return axios.put(serviceCategoriesApi, newServiceCategory);
}

function deleteServiceCategory(
 props: ApiDefaultProps & {
  serviceCategoryID: number;
 }
) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('serviceCategoryID', props.serviceCategoryID.toString());
 return axios.delete(`${serviceCategoriesApi}?${params.toString()}`);
}
// service state
const serviceStatesApi = '/serviceStates';
function getServiceStates(
 props: ApiDefaultProps
): Promise<AxiosResponse<ServiceState[]>> {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 return axios.get(`${serviceStatesApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
// service tags
const serviceTagsApi = '/serviceTags';
function getServiceTags(props: ApiDefaultProps & { serviceID: number }) {
 const params = new URLSearchParams();
 params.append('lang', props.locale);
 params.append('serviceID', props.serviceID.toString());
 return axios.get<ResponseShape<{ ServiceTags: ServiceTag[] }>>(
  `${serviceTagsApi}?${params.toString()}`,
  {
   signal: props.signal,
  }
 );
}
//
const contactUsApi = '/contact-us';
function getContactUs<T extends { pagination?: PaginationProps }>(
 props: ApiDefaultProps &
  T & {
   isRead?: boolean;
   deleted?: boolean;
   searchText?: string;
  }
): Promise<
 AxiosResponse<
  ResponseShape<
   T['pagination'] extends PaginationProps
    ? {
       ContactUsList: PagedResponse<ContactUs[]>;
      }
    : { ContactUsList: ContactUs[] }
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
  'isRead',
  props.isRead === undefined ? 'false' : props.isRead.toString()
 );
 params.append(
  'deleted',
  props.deleted === undefined ? 'false' : props.deleted.toString()
 );
 return axios.get(`${contactUsApi}?${params.toString()}`, {
  signal: props.signal,
 });
}
const addContactUs = (newContactUs: ContactUs) => {
 return axios.post(contactUsApi, newContactUs);
};
const readContactUs = (contactUsID: number) => {
 const params = new URLSearchParams();
 params.append('contactUsID', contactUsID.toString());
 return axios.patch(`${contactUsApi}/ReadMessage?${params.toString()}`);
};
// socials
const socialsApi = '/social-media';
const getSocials = () => {
 return axios.get<ResponseShape<{ SocialMedias: Social[] }>>(socialsApi);
};
const addSocial = (newSocial: Pick<Social, 'id' | 'link'>[]) => {
 return axios.post(socialsApi, newSocial);
};
// about us
const aboutUsApi = '/about-us';
function getAboutUs() {
 return axios.get<ResponseShape<{ AboutUs: AboutUs }>>(aboutUsApi);
}
function updateAboutUs(newAboutUs: AboutUs) {
 return axios.post(aboutUsApi, newAboutUs);
}
//
export {
 type ResponseShape,
 type TagCategory,
 type Social,
 type AboutUs,
 type Tag,
 type BlogCategory,
 type Blog,
 type PagedResponse,
 type BlogState,
 type PaginationProps,
 type BlogComment,
 type User,
 type BlogTag,
 type Project,
 type ProjectCategory,
 type ProjectState,
 type ProjectTag,
 type Service,
 type ServiceCategory,
 type ServiceState,
 type ServiceTag,
 type ContactUs,
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
 updateUserImage,
 updateUser,
 changeBlogCommentState,
 changeUserState,
 projectsApi,
 getProjects,
 getProject,
 createProject,
 updateProject,
 patchProject,
 getProjectImages,
 createProjectImage,
 projectCategoriesApi,
 getProjectCategories,
 createProjectCategory,
 updateProjectCategory,
 deleteProjectCategory,
 projecteStatesApi,
 getProjectStates,
 projectTagsApi,
 getProjectTags,
 servicesApi,
 getServices,
 createService,
 updateService,
 patchService,
 getService,
 getServiceImages,
 createServiceImage,
 serviceCategoriesApi,
 getServiceCategories,
 createServiceCategory,
 updateServiceCategory,
 deleteServiceCategory,
 serviceStatesApi,
 getServiceStates,
 serviceTagsApi,
 getServiceTags,
 contactUsApi,
 getContactUs,
 addContactUs,
 readContactUs,
 socialsApi,
 getSocials,
 addSocial,
 toggleBlogInterested,
 aboutUsApi,
 getAboutUs,
 updateAboutUs,
};
