import zod from 'zod';

const envSchema = zod.object({
    DATABASE_URL: zod.string().min(1, "This should not be empty"),
    GOOGLE_CLIENT_ID: zod.string().min(1, "This should not be empty"),
    GOOGLE_CLIENT_SECRET: zod.string().min(1, "This should not be empty"),
    NEXTAUTH_URL: zod.string().min(1, "This should not be empty"),
    NEXTAUTH_SECRET: zod.string().min(1, "This should not be empty"),
});

export const env = envSchema.parse(process.env);