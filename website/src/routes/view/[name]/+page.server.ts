import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
    const res = await fetch(`http://localhost:50451/api/document/${params.name}`);

    const document = await res.json();

    return { document };
}) satisfies PageServerLoad;