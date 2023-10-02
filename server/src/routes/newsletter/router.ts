import Elysia from "elysia";
import { createNewsletterSignUpSchema } from "./validation";
import { createNewsletterSignUp, getNewsletterSignUps } from "./controllers";
import { ctx } from "../../context";

export const newsletterRouter = new Elysia({ prefix: "/newsletter" })
    .use(ctx)
    .post(
        "/signups",
        async ({
            body,
            set,
        }) => {
            const newsletterSignUp = await createNewsletterSignUp(body);
            
            return newsletterSignUp;
        },
        { body: createNewsletterSignUpSchema },
    )
    .get(
        "/signups",
        async () => {
            const newsletterSignUps = await getNewsletterSignUps();

            return newsletterSignUps;
        },
    );