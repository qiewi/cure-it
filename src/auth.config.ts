import {Provider} from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import {NextAuthConfig} from "next-auth";
import {prisma} from "@/prisma";
import {z} from "zod";
import bcrypt from "bcryptjs";

const credentialsSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string(),
});

const providers: Provider[] = [
    Credentials({
        credentials: {
            email: { label: "Email", type:"email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(c) {
            const parsedCredentials = credentialsSchema.safeParse(c);
            if (!parsedCredentials.success) {
                console.error("Validation Error:", parsedCredentials.error.format());
                throw new Error("Invalid credentials format");
            }

            const { email, password } = parsedCredentials.data;

            // Find user in database
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) return null;
            if (!user.password) return null;

            // Check password
            const passwordMatch = bcrypt.compare(password, user.password);
            if (!passwordMatch) return null;

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            };
        },
    }),
    Google
]


export default { providers: providers } satisfies NextAuthConfig