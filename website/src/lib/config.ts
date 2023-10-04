import { env } from "$env/dynamic/public";
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

export const config = configSchema.parse(
    Object.fromEntries(
        Object
            .entries(env)
            .map(([
                key,
                value,
            ]) => {
                return [
                    key.replace("PUBLIC_", ""),
                    value,
                ];
            }),
    ),
);