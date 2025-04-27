'use client';
import { PropsWithChildren, useMemo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProvider({ children }: PropsWithChildren) {
 const queryClient = useMemo(() => getQueryClient(), []);
 return (
  <QueryClientProvider client={queryClient}>
   {children}
   <ReactQueryDevtools />
  </QueryClientProvider>
 );
}
