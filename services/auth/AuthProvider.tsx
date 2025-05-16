'use client';
import {
 useState,
 PropsWithChildren,
 useCallback,
 useMemo,
 useEffect,
} from 'react';
import {
 authContext,
 getAuthFromCookie,
 setAuthToCookie,
 logout,
} from './authContext';

export default function AuthProvider({ children }: PropsWithChildren) {
 const [isLogedIn, setIsLogedIn] = useState(true);
 const [firstSet, setFirstSet] = useState(false);
 //
 const setAuthToken = useCallback((value: string) => {
  setAuthToCookie(value);
  setIsLogedIn(true);
 }, []);
 const getAuthToken = useCallback(() => {
  const token = getAuthFromCookie();
  if (token) {
   setIsLogedIn(true);
  } else {
   setIsLogedIn(false);
  }
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
   firstSet,
  };
 }, [isLogedIn, setAuthToken, getAuthToken, removeAuthToken, firstSet]);

 useEffect(() => {
  if (firstSet) return;
  getAuthToken();
  setFirstSet(true);
 }, [firstSet, getAuthToken]);

 return <authContext.Provider value={ctx}>{children}</authContext.Provider>;
}
