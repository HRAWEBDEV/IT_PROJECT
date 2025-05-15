'use client';
import { useState, PropsWithChildren, useCallback, useMemo } from 'react';
import {
 authContext,
 getAuthFromCookie,
 setAuthToCookie,
 logout,
} from './authContext';

export default function AuthProvider({ children }: PropsWithChildren) {
 const [isLogedIn, setIsLogedIn] = useState(false);
 //
 const setAuthToken = useCallback((value: string) => {
  setAuthToCookie(value);
  setIsLogedIn(true);
 }, []);
 const getAuthToken = useCallback(() => {
  const token = getAuthFromCookie();
  if (token) setIsLogedIn(true);
  return token;
 }, []);
 const removeAuthToken = useCallback(() => {
  logout();
  setIsLogedIn(false);
 }, []);
 //

 const ctx = useMemo(() => {
  return {
   isLogedIn,
   setAuthToken,
   getAuthToken,
   removeAuthToken,
  };
 }, [isLogedIn, setAuthToken, getAuthToken, removeAuthToken]);

 return <authContext.Provider value={ctx}>{children}</authContext.Provider>;
}
