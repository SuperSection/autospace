import NextAuth from 'next-auth';
import { authOptions } from '@autospace/network/src/config/authOptions';

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
