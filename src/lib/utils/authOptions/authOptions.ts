import { connectToDB } from '@/src/lib/mongoose';
import { AuthOptions } from 'next-auth';
// import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from 'next-auth/providers/google';
// import NaverProvider from "next-auth/providers/naver";
import {
  createUser,
  getUserByEmail,
} from '@/src/lib/action/user/users.actions';

export const authOptions: AuthOptions = {
  providers: [
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID!,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID!,
    //   clientSecret: process.env.NAVER_CLIENT_SECRET!,
    // }),
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
};
