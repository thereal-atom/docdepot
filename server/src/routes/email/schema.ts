import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("emails", {
    id: int("id").primaryKey({ autoIncrement: true }),
    email: text("email")
        .notNull()
        .unique(),
    createdAt: int("createdAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});