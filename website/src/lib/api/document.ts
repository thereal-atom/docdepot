import { apiFetch, type CreateDocumentData, type Document } from "./";

export const getDocumentByName = async (name: string): Promise<Document | null> => {
    const res = await apiFetch(`/document/${name}`, { method: "GET" });

    return res;
};

export const createDocument = async (data: CreateDocumentData): Promise<Document> => {
    const res = await apiFetch("/document", {
        method: "POST",
        data,
    });

    return res;
};