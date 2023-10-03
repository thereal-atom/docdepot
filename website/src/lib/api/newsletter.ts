import { apiFetch, type CreateNewsletterSignUpData, type NewsletterSignUp } from "./";

export const createNewsletterSignUp = async (data: CreateNewsletterSignUpData): Promise<NewsletterSignUp> => {
    const res = await apiFetch("/newsletter/signup", {
        method: "POST",
        data,
    });

    return res;
};