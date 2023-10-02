import { t } from "elysia";

export const createNewsletterSignUpSchema = t.Object({
    email: t.String({
        format: "email",
        default: "person@example.com",
    })
});

export type CreateNewsletterSignUpData = typeof createNewsletterSignUpSchema["static"];