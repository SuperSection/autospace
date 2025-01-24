import NextAuth from 'next-auth';
import { authConfig } from '../config/authConfig';

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
