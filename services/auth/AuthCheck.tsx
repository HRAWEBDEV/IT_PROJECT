'use client';
import { PropsWithChildren, useEffect, useMemo, useCallback } from 'react';
import { authCheckContext } from './authCheckContext';
import { getUserInfo } from '../api-actions/authApiActionts';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './authContext';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthCheck({ children }: PropsWithChildren) {
 const { firstSet, isLogedIn, removeAuthToken } = useAuth();
 const { enqueueSnackbar } = useSnackbar();
 const router = useRouter();
 const {
  data: userInfo = null,
  mutate: getUserInfoMutate,
  isPending: isFetchingUser,
 } = useMutation({
  mutationFn: ({ signal }: { signal?: AbortSignal }) => {
   return getUserInfo({ signal }).then((res) => {
    const userInfo = res.data.payload;
    if (!userInfo.User) {
     removeAuthToken();
     router.push('/');
    }
    return userInfo;
   });
  },
  onError: (error: AxiosError) => {
   enqueueSnackbar({
    message: error.response?.data as string,
    variant: 'error',
   });
   removeAuthToken();
   router.push('/');
  },
 });

 const refreshUserInfo = useCallback(() => {
  getUserInfoMutate({ signal: new AbortController().signal });
 }, [getUserInfoMutate]);

 const ctx = useMemo(() => {
  return {
   userInfo: isLogedIn ? userInfo : null,
   isFetchingUser,
   refreshUserInfo,
  };
 }, [userInfo, isFetchingUser, isLogedIn, refreshUserInfo]);

 useEffect(() => {
  if (!firstSet || !isLogedIn) return;
  const signal = new AbortController();
  getUserInfoMutate({ signal: signal.signal });
  return () => signal.abort();
 }, [firstSet, isLogedIn, getUserInfoMutate]);

 return (
  <authCheckContext.Provider value={ctx}>{children}</authCheckContext.Provider>
 );
}
