'use client';
import { useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { axios } from './axios';
import { useAppConfig } from '../app-config/appConfig';

export default function AxiosInterceptor() {
 const { localeInfo } = useAppConfig();
 const { getAuthToken } = useAuth();
 useEffect(() => {
  const cleanUp = () => {
   axios.interceptors.request.eject(requestWatcher);
  };
  const requestWatcher = axios.interceptors.request.use((config) => {
   config.headers.set('Authorization', `Bearer ${getAuthToken()}`);
   config.headers.set('languageID', localeInfo.id);
   return config;
  });
  return cleanUp;
 }, [getAuthToken, localeInfo]);
 return <></>;
}
