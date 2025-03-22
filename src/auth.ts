import NextAuth, {type DefaultSession} from "next-auth";
import type {DefaultJWT} from "next-auth/jwt";
import {type Adapter} from "next-auth/adapters";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/prisma";
import AuthConfig from "@/auth.config";


declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string | undefined;
            image: string | null | undefined;
            role: "ADMIN" | "USER";
        } & DefaultSession["user"];
    }

    interface User {
        role: "ADMIN" | "USER";
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string | undefined;
        picture: string | null | undefined;
        role: "ADMIN" | "USER";
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.picture = user.image;
            }
            return token;
        },

        session: async ({ session, token }) => {
            session.user.id = token.id as string;
            session.user.image = token.picture;
            session.user.role = token.role;
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    pages: {
        error: "/auth-error",
    },
    ...AuthConfig
});
