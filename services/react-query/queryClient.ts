import { QueryClient, isServer } from '@tanstack/react-query';

let reactQueryClient: QueryClient | null = null;

function createQueryClient(): QueryClient {
 return new QueryClient({
  defaultOptions: {
   queries: {
    refetchOnWindowFocus: false,
   },
  },
 });
}

export function getQueryClient(): QueryClient {
 if (isServer) {
  return createQueryClient();
 } else {
  if (!reactQueryClient) reactQueryClient = createQueryClient();
  return reactQueryClient;
 }
}
