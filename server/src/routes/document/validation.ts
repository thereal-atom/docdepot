import { t } from "elysia";

export const createDocumentSchema = t.Object({
    name: t.String(),
    password: t.String(),
    markdownString: t.String(),
});

export type CreateDocumentData = typeof createDocumentSchema["static"];
