import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { track } from "@vercel/analytics";
import { api } from "$lib/api";

export const load = (async ({ params }) => {
    const document = await api.document.getByName(params.name);

    if (!document) throw error(404, "document not found");

    track("ViewDocument", { name: document.name });

    return { document };
}) satisfies PageServerLoad;