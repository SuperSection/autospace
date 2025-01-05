import { NextAuthConfig, User } from 'next-auth';
import GoogleProvider from '@auth/core/providers/google';
import CredentialsProvider from '@auth/core/providers/credentials';
import * as jwt from 'jsonwebtoken';

import {
  AuthProviderType,
  GetAuthProviderDocument,
  LoginDocument,
  RegisterWithProviderDocument,
} from '../gql/generated';
import { fetchGraphQL } from '../fetch';
import { JWT } from '@auth/core/jwt';

const MAX_AGE = 1 * 24 * 60 * 60;

const secureCookies = process.env.AUTH_URL?.startsWith('https://');
const hostName = new URL(process.env.AUTH_URL || '').hostname;
const rootDomain = 'supersection.com';

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile',
        },
      },
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      // Function to validate user credentials
      async authorize(credentials) {
        console.log('Received credentials in authorize:', credentials);

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Email and password are required');
        }
        const { email, password } = credentials;

        try {
          const { data, error } = await fetchGraphQL({
            document: LoginDocument,
            variables: {
              loginInput: {
                email: email as string,
                password: password as string,
              },
            },
          });

          if (!data?.login.token || error) {
            throw new Error(
              'Authorization failed: Invalid credentials or user not found',
            );
          }

          const uid = data.login.user.uid;
          const name = data.login.user.name;
          const image = data.login.user.image;

          return { id: uid, name, image, email } as User;
        } catch (error) {
          console.log('Failed to authorize Credentials:', error);
          return null;
        }
      },
    }),
  ],

  // Enable debug mode for development
  debug: true,

  // Configure session settings
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  jwt: {
    maxAge: MAX_AGE,
    // Custom JWT encoding function
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined');
      }
      const { sub, ...tokenProps } = token;

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const expirationTimestamp = currentTimeInSeconds + MAX_AGE;

      return jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret as string,
        { algorithm: 'HS256' },
      );
    },

    // Custom JWT decoding function
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error('Token is undefined');
      }

      try {
        const decodedToken = jwt.verify(token, secret as string, {
          algorithms: ['HS256'],
        });
        return decodedToken as JWT;
      } catch (error) {
        console.log('Failed to decode jwt:', error);
        return null;
      }
    },
  },

  cookies: {
    sessionToken: {
      name: `${secureCookies ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: secureCookies,
        domain: hostName == 'localhost' ? hostName : '.' + rootDomain, // add a . in front so that subdomains are included
      },
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { id, name, image } = user;

        const existingUser = await fetchGraphQL({
          document: GetAuthProviderDocument,
          variables: { uid: id as string },
        });

        if (!existingUser.data?.getAuthProvider?.uid) {
          await fetchGraphQL({
            document: RegisterWithProviderDocument,
            variables: {
              registerWithProviderInput: {
                uid: id as string,
                type: AuthProviderType.Google,
                name: name || '',
                image,
              },
            },
          });
        }
      }

      return true;
    },

    async session({ token, session }) {
      // Customize session object based on token data
      if (token) {
        session.user = {
          ...session.user,
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email as string,
          name: token.name,
        };
      }
      return session;
    },
  },

  // Configure custom pages
  pages: {
    signIn: '/signIn',
  },
};
