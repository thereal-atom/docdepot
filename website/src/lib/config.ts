import { z } from "zod";

const configSchema = z.object({
    NODE_ENV: z.enum([
        "development",
        "production",
    ]),
    API_URL: z
        .string()
        .url(),
});

export const config = configSchema.parse(process.env);