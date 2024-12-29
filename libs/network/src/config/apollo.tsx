'use client';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';

export interface ApolloProviderProps {
  children: React.ReactNode;
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return <Provider client={apolloClient}>{children}</Provider>;
};
