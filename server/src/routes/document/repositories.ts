
import { eq } from "drizzle-orm";
import documentsTable from "./schema";
import { DatabaseConflictError, db } from "../../db";


export type Document = typeof documentsTable["$inferSelect"];
type DatabaseDocumentData = typeof documentsTable["$inferInsert"];

export const createDatabaseDocument = async (data: DatabaseDocumentData) => {
    const existingDocument = await getDatabaseDocument({ name: data.name });

    if (existingDocument) throw new DatabaseConflictError("document with that name already exists");

    const documents = await db
        .insert(documentsTable)
        .values(data)
        .returning();

    return documents[0]
};

export const getDatabaseDocument = async (filterData: {
    id: number;
    name?: undefined;
} | {
    id?: undefined;
    name: string;
}): Promise<Document> => {
    const filter = 
        filterData.id ? eq(documentsTable.id, filterData.id)
        : filterData.name ? eq(documentsTable.name, filterData.name)
        : undefined;
    const documents = await db
        .select()
        .from(documentsTable)
        .where(filter);

    return documents[0];
};

export const deleteDatabaseDocument = async (filterData: {
    id: number;
    name?: undefined;
} | {
    id?: undefined;
    name: string;
}): Promise<void> => {
    const filter = 
        filterData.id ? eq(documentsTable.id, filterData.id)
        : filterData.name ? eq(documentsTable.name, filterData.name)
        : undefined;
    await db
        .delete(documentsTable)
        .where(filter);
};