import Elysia, { t } from "elysia";
import { createDocumentSchema } from "./validation";
import { createDocument, deleteDocumentById, getDocumentByName } from "./controllers";
import { ctx } from "../../context";

export const documentRouter = new Elysia({ prefix: "/document" })
    .use(ctx)
    .post(
        "/",
        async ({
            body,
            set,
        }) => {
            const document = await createDocument(body);

            set.status = 200;

            return document
        },
        { body: createDocumentSchema },
    )
    .get(
        "/:name",
        async ({ params }) => {
            const document = await getDocumentByName(params.name);

            return document;
        },
        { params: t.Object({ name: t.String() })},
    )
    .delete(
        "/:id",
        async ({ params }) => {
            const document = await deleteDocumentById(params.id);

            return document;
        },
        { params: t.Object({ id: t.Number() })},
    );