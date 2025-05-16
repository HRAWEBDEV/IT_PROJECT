'use client';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { authCheckContext } from './authCheckContext';
import { getUserInfo } from '../api-actions/authApiActionts';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './authContext';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

export default function AuthCheck({ children }: PropsWithChildren) {
 const { firstSet, isLogedIn } = useAuth();
 const { enqueueSnackbar } = useSnackbar();

 const {
  data: userInfo = null,
  mutate: getUserInfoMutate,
  isPending: isFetchingUser,
 } = useMutation({
  mutationFn: ({ signal }: { signal?: AbortSignal }) => {
   return getUserInfo({ signal }).then((res) => res.data.payload);
  },
  onError: (error: AxiosError) => {
   enqueueSnackbar({
    message: error.response?.data as string,
    variant: 'error',
   });
  },
 });

 const ctx = useMemo(() => {
  return {
   userInfo: isLogedIn ? userInfo : null,
   isFetchingUser,
  };
 }, [userInfo, isFetchingUser, isLogedIn]);

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
