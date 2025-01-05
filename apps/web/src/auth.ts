import NextAuth from 'next-auth';
import { authConfig } from '@autospace/network/src/config/authConfig';

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
