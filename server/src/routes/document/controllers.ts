import { createDatabaseDocument, deleteDatabaseDocument, getDatabaseDocument } from "./repositories";
import { CreateDocumentData, documentNameRegExp } from "./validation";
import { converter } from "../../utils/core";
import { generatePasswordHash, verifyPassword } from "../../utils/cryptography";
import { APIError, ConflictError, UnauthorizedError } from "../../utils/api";

export const createDocument = async (data: CreateDocumentData) => {
    const existingDocument = await getDatabaseDocument({ name: data.name });
    if (existingDocument) throw new ConflictError(`A document with that name ('${data.name}') already exists`);

    // https://stackoverflow.com/questions/3891641/regex-test-only-works-every-other-time
    // there is a bug with the regex engine which means that .test() resets the global flag
    // this means that the regex only works every other time
    // so we run it twice ever time
    // this honestly makes no sense but fine
    const isValidName = documentNameRegExp.test(data.name);
    documentNameRegExp.test(data.name);
    if (!isValidName) throw new APIError(400, `Document name ('${data.name}') must be alphanumeric and may contain '-' and '_' characters only`);

    const {
        hashedPassword,
        salt,
    } = await generatePasswordHash(data.password);

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

    const isPasswordValid = await verifyPassword(password, salt, hashedPassword);
    if (!isPasswordValid) throw new UnauthorizedError("invalid password");

    await deleteDatabaseDocument({ id });
};