import { createDatabaseDocument, deleteDatabaseDocument, getDatabaseDocument } from "./repositories";
import { CreateDocumentData } from "./validation";
import { converter } from "../../utils/core";
import { generatePasswordHash, verifyPassword } from "../../utils/cryptography";
import { UnauthorizedError } from "../../utils/api";

export const createDocument = async (data: CreateDocumentData) => {
    const htmlString = converter.makeHtml(data.markdownString);

    const hashedPassword = generatePasswordHash(data.password);

    const document = await createDatabaseDocument({
        ...data,
        password: `${hashedPassword.hashedPassword};${hashedPassword.salt}`,
        htmlString,
    });

    return document;
};

export const getDocumentByName = async (name: string) => {
    const document = await getDatabaseDocument({ name });

    return document;
};

export const deleteDocumentById = async (id: number, password: string) => {
    const document = await getDatabaseDocument({ id });

    if (!document) return;

    const [
        hashedPassword,
        salt,
    ] = document.password.split(";");

    const isPasswordValid = verifyPassword(password, salt, hashedPassword);
    if (!isPasswordValid) throw new UnauthorizedError("invalid password");

    await deleteDatabaseDocument({ id });
};