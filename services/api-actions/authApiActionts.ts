import { axios } from '../axios/axios';
import { type ResponseShape, type User } from './globalApiActions';

const registerApi = '/UI/Login';
const loginApi = '/UI/Authenticate';
const getUserInfoApi = '/UI/UserInfo';

type Owner = {
 id: number;
 postalCode: string | null;
 ownerName: string | null;
 nationalCode: string | null;
 registerNo: string | null;
 addressName: string | null;
 descriptionName: string | null;
 telephone1: string | null;
 telephone2: string | null;
 telephone3: string | null;
 cellphone1: string | null;
 cellphone2: string | null;
 cellphone3: string | null;
 fax: string | null;
 email: string | null;
 longitude: number | null;
 latitude: number | null;
};
type RegisterUser = User;
type RoleAccess = {
 formID: number;
 roleName: string;
 uiFormName: string;
 formName: string;
 read: boolean;
 write: boolean;
 remove: boolean;
 update: boolean;
 changeState: boolean;
};
type UserInfo = {
 User: User;
 HasDashboard: boolean;
 RoleAccesses: RoleAccess[];
};

type Role = {
 id: number;
 name: string;
};
type Auth = {
 Token: string;
 RoleAccesses: RoleAccess[];
};

function registerUser({ cellPhone }: { cellPhone: string }) {
 const params = new URLSearchParams({
  cellPhone,
 });
 return axios.get<
  ResponseShape<{
   User: RegisterUser;
  }>
 >(`${registerApi}?${params.toString()}`);
}

function login({ userID, verifyCode }: { userID: number; verifyCode: string }) {
 const params = new URLSearchParams({
  userID: userID.toString(),
  verifyCode,
 });
 return axios.get<ResponseShape<Auth>>(`${loginApi}?${params.toString()}`);
}

function getUserInfo({ signal }: { signal?: AbortSignal }) {
 return axios.get<ResponseShape<UserInfo>>(getUserInfoApi, { signal });
}
//
const userRoleApi = '/UserRoles';

function getUserRoles({
 signal,
 userID,
}: {
 signal?: AbortSignal;
 userID: number;
}) {
 const params = new URLSearchParams({
  userID: userID.toString(),
 });
 return axios.get<
  ResponseShape<{ UserRoles: { userID: number; roleID: number }[] }>
 >(`${userRoleApi}?${params.toString()}`, { signal });
}

function updateUserRole(newRole: { userID: number; roleID: number }[]) {
 return axios.post(userRoleApi, newRole);
}
//
const roleApi = '/Roles';
function getRoles({ signal }: { signal?: AbortSignal }) {
 return axios.get<
  ResponseShape<{
   Roles: Role[];
  }>
 >(roleApi, { signal });
}
const roleAccessApi = '/RoleAccesses';
function getRoleAccesses({
 signal,
 roleID,
}: {
 signal?: AbortSignal;
 roleID: number;
}) {
 const params = new URLSearchParams({
  roleID: roleID.toString(),
 });
 return axios.get<
  ResponseShape<{
   RoleAccesses: RoleAccess[];
  }>
 >(`${roleAccessApi}?${params.toString()}`, { signal });
}
//
const ownerApi = '/Owner';
function getOwner({ signal }: { signal?: AbortSignal }) {
 return axios.get<Owner>(ownerApi, { signal });
}
function updateOwner(owner: Owner) {
 return axios.put(ownerApi, owner);
}

export {
 type UserInfo,
 type RoleAccess,
 type Role,
 type Owner,
 registerUser,
 login,
 getUserInfo,
 getUserInfoApi,
 getUserRoles,
 updateUserRole,
 getRoles,
 getOwner,
 ownerApi,
 updateOwner,
 getRoleAccesses,
};
