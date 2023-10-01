import { Config } from "drizzle-kit";
import config from "./src/config";

export default {
    schema: "./src/schema.ts",
    out: "./migrations",
    driver: "turso",
    dbCredentials: {
        url: config.DB_URL,
        authToken: config.DB_TOKEN,
    },
} satisfies Config;