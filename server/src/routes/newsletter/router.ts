import Elysia from "elysia";
import { createNewsletterSignUpSchema } from "./validation";
import { createNewsletterSignUp, getNewsletterSignUps } from "./controllers";
import { ctx } from "../../context";

export const newsletterRouter = new Elysia({ prefix: "/newsletter" })
    .use(ctx)
    .post(
        "/signup",
        async ({
            body,
            set,
        }) => {
            const newsletterSignUp = await createNewsletterSignUp(body);

            set.status = 201;
            
            return newsletterSignUp;
        },
        { body: createNewsletterSignUpSchema },
    )
    .get(
        "/signup",
        async () => {
            const newsletterSignUps = await getNewsletterSignUps();

            return newsletterSignUps;
        },
    );