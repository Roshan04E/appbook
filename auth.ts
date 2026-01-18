import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUserByEmail } from "./lib/database/actions/user.action";
import { use } from "react";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        if (!user) throw new Error("User not there");
        const isExistingUser = await getUserByEmail(user.email as string);
        if (!isExistingUser) {
          await createUser({
            name: user.name as string,
            email: user.email as string,
            avatar_url: user.image as string,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await getUserByEmail(user.email);
        token.id = dbUser.id; // attach DB id
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string; // expose to client
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
