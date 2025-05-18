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

type Auth = {
 Token: string;
 RoleAccesses: [];
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

export { type UserInfo, registerUser, login, getUserInfo, getUserInfoApi };
