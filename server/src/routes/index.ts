import Elysia from "elysia";
import { documentRouter } from "./document/router";
import { newsletterRouter } from "./newsletter/router";

export const api = new Elysia({ prefix: "api" })
    .use(documentRouter)
    .use(newsletterRouter);