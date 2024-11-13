import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import { connectToDB } from '../lib/mongoose';
import { createUser, getUserByEmail } from '../lib/action/user/users.actions';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, ...rest }) {
      console.log('signIn');
      console.log(user, rest);
      connectToDB();
      await createUser(user);
      return true;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      const user = await getUserByEmail({ email: token.email! });
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
  secret: 'qwer1234',
});
