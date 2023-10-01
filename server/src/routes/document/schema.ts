import { sqliteTable, int, text, index } from "drizzle-orm/sqlite-core";

export default sqliteTable(
    "documents",
    {
        id: int("id").primaryKey({ autoIncrement: true }),
        name: text("name").notNull(),
        password: text("password").notNull(),
        markdownString: text("markdownString").notNull(),
        htmlString: text("htmlString").notNull(),
        createdAt: int("createdAt", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
    },
    (table) => {
        return {
            nameIdx: index("name_idx").on(table.name),
        };
    },
);