'use client';
import { useAuth } from './authContext';
import { useEffect } from 'react';

export default function AuthCheck() {
 const { getAuthToken } = useAuth();
 useEffect(() => {
  getAuthToken();
 }, [getAuthToken]);
 return <></>;
}
