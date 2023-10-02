import Elysia from "elysia";
import { APIError, ConflictError } from './../utils/api';
import { DatabaseConflictError, DatabaseError } from '../db';

export const ctx = new Elysia({ name: "@app/ctx",})
    .error({
        ConflictError,
        DatabaseConflictError,
    })
    .onError(({
        code,
        error,
        set,
    }) => {
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
    })