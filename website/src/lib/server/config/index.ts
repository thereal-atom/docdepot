import { env } from "$env/dynamic/private";
import { z } from "zod";

const configSchema = z.object({ SECRET: z.string() });

export const config = configSchema.parse(env);