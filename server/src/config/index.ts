import { z } from "zod";

const configSchema = z.object({
    NODE_ENV: z.enum([
        "production",
        "development",
    ]),
    DB_URL: z
        .string()
        .url(),
    DB_TOKEN: z.string(),
    DB_CONNECTION_TYPE: z.enum([
        // "local",
        "remote",
        "local-replica",
    ]),
    SECRET: z.string(),
});

export const config = configSchema.parse(process.env);
export const prod = config.NODE_ENV === "production";