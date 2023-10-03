import { relations } from "drizzle-orm";
import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int("id").primaryKey({ autoIncrement: true }),
    email: text("email")
        .notNull()
        .unique(),
    createdAt: int("createdAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});

export const userKeys = sqliteTable("userKeys", {
    id: int("id").primaryKey({ autoIncrement: true }),
    userId: int("userId"),
});

export const userSessions = sqliteTable("userSessions", {
    id: int("id").primaryKey({ autoIncrement: true }),
    userId: int("userId"),
    activeExpires: int("activeExpires", { mode: "timestamp" }),
    idleExpires: int("idleExpires", { mode: "timestamp" }),
});

export const usersRelations = relations(users, ({ many }) => ({
    keys: many(userKeys),
    sessions: many(userSessions),
}));