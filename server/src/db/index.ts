import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import config from "../config";
import * as schema from "./schema";

const client = createClient({
    url: config.DB_URL,
    authToken: config.DB_TOKEN,
});
 
export const db = drizzle(client, { schema });

type DatabaseCode = "CONFLICT"

class DatabaseError extends Error {
    code: DatabaseCode;

    constructor(code: DatabaseCode, message: string) {
        super(message);

        this.code = code;
    };
};

export class DatabaseConflictError extends DatabaseError {
    constructor(message: string) {
        super("CONFLICT", message);
    };
};