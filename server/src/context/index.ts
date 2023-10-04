import Elysia from "elysia";
import { cron } from "@elysiajs/cron";
import { helmet } from "elysia-helmet";
import { APIError, ConflictError } from './../utils/api';
import { DatabaseConflictError, DatabaseError, client, } from '../db';
import { config } from "../config";
import { auth } from "../auth";

export const ctx = new Elysia({ name: "@app/ctx" })
    .use(config.DB_CONNECTION_TYPE === "local-replica" ? cron({
        name: "heartbeat",
        pattern: "*/2 * * * * *",
        run() {
            void client.sync().then(() => {});
        },
    }) : (a) => a)
    .decorate("auth", auth)
    .use(helmet())
    .onRequest(({
        set,
        request: { headers },
    }) => {
        if (!headers || headers.get("dd-secret") !== config.SECRET) {
            set.status = 403;

            return "Forbidden";
        };
    })
    .error({
        ConflictError,
        DatabaseConflictError,
    })
    .onError(({
        code,
        error,
        set,
    }) => {
        console.error(error);

        set.status = 500;

        if (code === "NOT_FOUND") set.status = 404;

        if (error instanceof APIError) set.status = error.code;
        if (error instanceof DatabaseError) {
            switch (error.code) {
                case "CONFLICT":
                    set.status = 409;
                    
                    break;
                default:
                    set.status = 500;

                    break;
            };
        };

        return error.message;
    })
    .onStart(({ app }) => {
        console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
    });