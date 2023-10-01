import { Document, createDatabaseDocument, deleteDatabaseDocument, getDatabaseDocument } from "./repositories";
import { CreateDocumentData } from "./validation";
import { converter } from "../../utils/core";

export const createDocument = async (data: CreateDocumentData): Promise<Document> => {
    const htmlString = converter.makeHtml(data.markdownString)

    const document = await createDatabaseDocument({
        ...data,
        htmlString,
    });

    return document;
};

export const getDocumentByName = async (name: string): Promise<Document> => {
    const document = await getDatabaseDocument({ name });

    return document;
};

export const deleteDocumentById = async (id: number): Promise<void> => {
    await deleteDatabaseDocument({ id });
};