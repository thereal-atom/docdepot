import { Elysia } from "elysia";
import { api } from './routes';
import { config } from "./config";
import cors from "@elysiajs/cors";

export const app = new Elysia()
    .use(api)
    .use(cors())
    .get("/" , () => 200)
    .listen(config.NODE_ENV === "production" ? 8080 : 50451);

export type App = typeof app;