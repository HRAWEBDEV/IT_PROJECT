import { axios } from '../axios/axios';

const registerApi = '/UI/Login';
const loginApi = '/UI/Authenticate';

function registerUser({ cellPhone }: { cellPhone: string }) {
 const params = new URLSearchParams({
  cellPhone,
 });
 return axios.get(`${registerApi}?${params.toString()}`);
}

function login({ userID, verifyCode }: { userID: number; verifyCode: string }) {
 const params = new URLSearchParams({
  userID: userID.toString(),
  verifyCode,
 });
 return axios.get(`${loginApi}?${params.toString()}`);
}

export { registerUser, login };
