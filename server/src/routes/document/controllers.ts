import { createDatabaseDocument, deleteDatabaseDocument, getDatabaseDocument } from "./repositories";
import { CreateDocumentData, documentNameRegExp } from "./validation";
import { converter } from "../../utils/core";
import { generatePasswordHash, verifyPassword } from "../../utils/cryptography";
import { APIError, ConflictError, UnauthorizedError } from "../../utils/api";

export const createDocument = async (data: CreateDocumentData) => {
    const existingDocument = await getDatabaseDocument({ name: data.name });
    if (existingDocument) throw new ConflictError(`A document with that name ('${data.name}') already exists`);

    if (!documentNameRegExp.test(data.name)) throw new APIError(400, "Document name must be alphanumeric and may contain '-' and '_' characters only");

    const {
        hashedPassword,
        salt,
    } = generatePasswordHash(data.password);

    const document = await createDatabaseDocument({
        ...data,
        password: `${hashedPassword};${salt}`,
        htmlString: converter.makeHtml(data.markdownString),
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