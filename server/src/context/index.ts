import Elysia from "elysia";
import { cron } from "@elysiajs/cron";
import { helmet } from "elysia-helmet";
import { logger } from "@bogeychan/elysia-logger";
import { APIError, ConflictError } from './../utils/api';
import { DatabaseConflictError, DatabaseError, client, } from '../db';
import { config, prod } from "../config";
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
    .use(logger({
        level: "error",
        name: "docdepot-logger",
    }))
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
    .onStart(({ app, log }) => {
        if (log) {
            log.info(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
        };
    })
    .onStop(({ log }) => {
        if (log && prod) {
            log.info("Server stopped");
        };
    })
    .onRequest(({ log, request }) => {
        if (log && prod) {
            log.debug(`Request received: ${request.method}: ${request.url}`);
        };
    })
    .onResponse(({ log, request }) => {
        if (log && prod) {
            log.debug(`Response sent: ${request.method}: ${request.url}`);
        };
    })
    .onError(({
        code,
        error,
        set,
        log,
    }) => {
        if (log && prod) log.error(error);

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

        return error.toString();
    })