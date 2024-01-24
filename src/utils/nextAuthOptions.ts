import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const response = await fetch("https://techtest.youapp.ai/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        if (response.ok && user.access_token) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) token = user as unknown as { [key: string]: any };

      return token;
    },
    // @ts-expect-error
    session: async ({ session, token }) => {
      // @ts-expect-error
      session.accessToken = token.access_token;
      session.user = { ...token };

      if (token && token.access_token) {
        const response = await fetch(
          "https://techtest.youapp.ai/api/getProfile",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              // @ts-expect-error
              "x-access-token": session.user.access_token,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          session.user = { ...userData };
        }
        return session;
      }
    },
  },
};
