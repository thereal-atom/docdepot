// import type { LayoutLoad } from "./$types";
// import { redirect } from "@sveltejs/kit";
import { inject } from "@vercel/analytics";
import { dev } from "$app/environment";
// import { config } from "$lib/config";
// import { addToast } from "$lib/stores/toasts";
 
inject({ mode: dev ? "development" : "production" });

// export const load = (({ route }) => {
//     if (config.NODE_ENV === "production" && route.id !== "/") {
//         addToast({
//             title: "DocDepot is still being developed.",
//             message: "In the mean time, sign up to the newsletter to stay tuned.",
//             type: "info",
//         });

//         throw redirect(303, "/");
//     };
// }) satisfies LayoutLoad;