import axios, { CreateAxiosDefaults } from 'axios';

const defaultConfig: CreateAxiosDefaults = {
 baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
} as const;
const axiosInstance = axios.create(defaultConfig);

axiosInstance.interceptors.request.use((config) => {
 return config;
});

export { axiosInstance as axios };
