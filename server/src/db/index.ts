import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import config from "../config";
import * as schema from "./schema";

// const databaseConnectionType: "remote" | "local-replica" = "local-replica";

const dbOptions = {
    url: config.DB_URL,
    authToken: config.DB_TOKEN,
}

// const dbOptions = {
//     url: "file:local.sqlite",
//     authToken: config.DB_TOKEN,
//     syncUrl: config.DB_URL,
// };

const client = createClient(dbOptions);

// sync before every request
client.sync().catch(console.error);
 
export const db = drizzle(client, { schema });

type DatabaseCode = "CONFLICT"

export class DatabaseError extends Error {
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