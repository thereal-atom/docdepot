import { error } from "@sveltejs/kit";
import { config } from "$lib/config";
import { config as serverConfig } from "$lib/server/config";
import { createDocument, getDocumentByName } from "./document";
import { createNewsletterSignUp } from "./newsletter";
// import { APIError } from "$lib/utils/error";

export * from "../../../../server/src/types";

export const apiFetch = async (path: string, options: {
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    data?: Record<any, any>;
    headers?: Record<any, string>;
}) => {
    const headers = options.method === "POST" || options.method === "PUT" || options.method === "PATCH" ? { "Content-Type": "application/json" } : undefined;

    const res = await fetch(`${config.API_URL}/api${path}`, {
        method: options.method,
        body: options.method === "POST" || options.method === "PATCH" || options.method === "PUT" ? JSON.stringify(options.data) : undefined,
        headers: {
            "DD-Secret": serverConfig.SECRET,
            ...headers,
            ...options.headers,
        },
    });

    if (res.ok) {
        const data = await res.json();

        return data;
    };

    const errorMessage = await res.text();

    throw error(res.status, errorMessage || "there was an unexpected error");
};

export const api = {
    document: {
        getByName: getDocumentByName,
        create: createDocument,
    },
    newsletter: {
        signup: {
            create: createNewsletterSignUp,
        },
    },
};