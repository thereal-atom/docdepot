import { Elysia } from "elysia";
import { api } from './routes';

export const app = new Elysia()
    .use(api)
    .get("/" , () => 200)
    .listen(50451);


// app.group("/email", app => app
//     .post(
//         "/",
//         async ({
//             body,
//             set,
//         }) => {
//             const existingEmail = await db.select().from(emailsTable).where(eq(emailsTable.email, body.email));

//             if (existingEmail[0]) throw new ConflictError("you're already subscribed");

//             const email = await db.insert(emailsTable).values({ email: body.email });

//             set.status = 201;

//             return email;
//         },
//         {
//             body: t.Object({
//                 email: t.String(),
//             })
//         },
//     )
//     .get("/", async () => {
//         const emails = await db.select().from(emailsTable);

//         return emails[0];
//     })
// );