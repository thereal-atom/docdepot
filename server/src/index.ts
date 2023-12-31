import { Elysia } from "elysia";
import { api } from './routes';
import cors from "@elysiajs/cors";

export const app = new Elysia()
    .use(api)
    .use(cors())
    .get("/" , () => 200)
    .listen(50451);

export type App = typeof app;