import newsletterSignsUpsTable from "./schema";
import { DatabaseConflictError, db } from "../../db";
import { eq } from "drizzle-orm";

export type NewsletterSignUp = typeof newsletterSignsUpsTable["$inferSelect"];
type DatabaseNewsletterSignUpData = typeof newsletterSignsUpsTable["$inferInsert"];

export const createDatabaseNewsletterSignUp = async (data: DatabaseNewsletterSignUpData) => {
    const existingNewsletterSignUp = await getDatabaseNewsletterSignUp({ email: data.email });

    if (existingNewsletterSignUp) throw new DatabaseConflictError("email already subscribed");

    const newsletterSignUps = await db
        .insert(newsletterSignsUpsTable)
        .values(data)
        .returning();

    return newsletterSignUps[0];
};

export const getDatabaseNewsletterSignUps = async (): Promise<NewsletterSignUp[]> => {
    const newsletterSignUps = await db
        .select()
        .from(newsletterSignsUpsTable);

    return newsletterSignUps;
};

export const getDatabaseNewsletterSignUp = async (filterData: {
    id: number;
    email?: undefined;
} | {
    id?: undefined;
    email: string;
}): Promise<NewsletterSignUp> => {
    const filter =
        filterData.id ? eq(newsletterSignsUpsTable.id, filterData.id)
        : filterData.email ? eq(newsletterSignsUpsTable.email, filterData.email)
        : undefined;
    const newsletterSignUps = await db
        .select()
        .from(newsletterSignsUpsTable)
        .where(filter);

    return newsletterSignUps[0];
};