'use client';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export interface ApolloProviderProps {
  children: React.ReactNode;
}

export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await fetch('/api/auth/token').then((res) => res.json());

    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : null),
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <Provider client={apolloClient}>{children}</Provider>;
};
