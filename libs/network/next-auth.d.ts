import { User as DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      uid: string;
    } & DefaultUser;
  }

  interface JWT {
    uid?: string;
  }
}
