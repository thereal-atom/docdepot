import { Elysia } from "elysia";
import { api } from './routes';

export const app = new Elysia()
    .use(api)
    .get("/" , () => 200)
    .listen(50451);