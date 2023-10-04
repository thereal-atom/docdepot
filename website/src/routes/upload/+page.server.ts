import type { Actions } from "./$types";
import { api } from "$lib/api";

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const document = await api.document.create({
            markdownString: data.markdownString.toString(),
            name: data.name.toString().trim(),
            password: data.password.toString(),
        });

        return document;
    },
} satisfies Actions;