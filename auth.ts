import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/index";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to the token
      }
      return token;
    },
    async signIn({ user }) {
      // Check if user exists in the database; if not, add them
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email as string))
        .limit(1);
      if (existingUser.length === 0) {
        await db.insert(users).values({
          email: user.email as string,
          name: user.name as string,
          image: user.image as string,
        });
      }
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/cart", "/order" ,"/profile"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig ;
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
