import { prisma } from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { env } from "process";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {session({session, user}){
        session.user.id = user.id;
        return session;
    }}
}

export default authOptions;