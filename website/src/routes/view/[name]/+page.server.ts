import { api } from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
    const document = await api.document.getByName(params.name);

    if (!document) throw error(404, "document not found");

    return { document };
}) satisfies PageServerLoad;