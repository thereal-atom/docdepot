import { t } from "elysia";

export const createDocumentSchema = t.Object({
    name: t.String({
        minLength: 1,
        maxLength: 64,
    }),
    password: t.String(),
    markdownString: t.String(),
});

export const documentNameRegExp = new RegExp(/^[a-z0-9_-]+$/gm);

export type CreateDocumentData = typeof createDocumentSchema["static"];
