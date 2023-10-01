import { z } from "zod";

const configSchema = z.object({
    DB_URL: z
        .string()
        .url(),
    DB_TOKEN: z.string(),
});

export default configSchema.parse(process.env);