import Elysia from "elysia";
import { APIError, ConflictError } from './../utils/api';

export const ctx = new Elysia({ name: "@app/ctx",})
    .error({
        ConflictError,
    })
    .onError(({
        code,
        error,
        set,
    }) => {
        set.status = 500;

        if (code === "NOT_FOUND") set.status = 404;

        if (error instanceof APIError) set.status = error.code;

        return error.message;
    })
    .onStart(({ app }) => {
        console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
    })