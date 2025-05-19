import { axios } from '../axios/axios';
import { type ResponseShape, type User } from './globalApiActions';

const registerApi = '/UI/Login';
const loginApi = '/UI/Authenticate';
const getUserInfoApi = '/UI/UserInfo';

type RegisterUser = User;
type UserInfo = {
 User: User;
 HasDashboard: boolean;
 RoleAccesses: [];
};
type RoleAccesses = unknown[];
type Role = {
 id: number;
 name: string;
};
type Auth = {
 Token: string;
 RoleAccesses: RoleAccesses;
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

export {
 type UserInfo,
 type RoleAccesses,
 type Role,
 registerUser,
 login,
 getUserInfo,
 getUserInfoApi,
 getUserRoles,
 updateUserRole,
 getRoles,
};
