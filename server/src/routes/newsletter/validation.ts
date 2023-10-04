import { t } from "elysia";

export const createNewsletterSignUpSchema = t.Object({
    email: t.String({
        format: "email",
        default: "person@example.com",
        error: "Invalid Email",
    })
});

export type CreateNewsletterSignUpData = typeof createNewsletterSignUpSchema["static"];