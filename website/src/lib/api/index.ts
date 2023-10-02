import { config } from "$lib/config";
import { createDocument, getDocumentByName } from "./document";

export * from "../../../../server/src/types";

export const apiFetch = async (path: string, options: {
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    data?: Record<any, string>;
    headers?: Record<any, string>;
}) => {
    const res = await fetch(`${config.API_URL}/api${path}`, {
        method: options.method,
        body: options.method === "POST" || options.method === "PATCH" || options.method === "PUT" ? JSON.stringify(options.data) : undefined,
        headers: options.headers,
    });

    // TODO: error handing and such

    if (res.ok) {
        const data = await res.json();

        return data;
    };
    
    return null;
};

export const api = {
    document: {
        getByName: getDocumentByName,
        create: createDocument,
    },
};