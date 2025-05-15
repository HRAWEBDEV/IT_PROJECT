import { axios } from '../axios/axios';
import { type ResponseShape } from './globalApiActions';

const registerApi = '/UI/Login';
const loginApi = '/UI/Authenticate';

type RegisterUser = {
 personID: number;
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

export { registerUser, login };
