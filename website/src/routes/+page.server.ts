import type { Actions } from "@sveltejs/kit";
import { api } from "$lib/api";

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const newsletterSignUp = await api.newsletter.signup.create({
            email: data.email
                .toString()
                .trim(),
        });

        return newsletterSignUp;
    },
} satisfies Actions;