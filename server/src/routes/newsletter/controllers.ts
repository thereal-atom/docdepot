import { ConflictError } from "../../utils/api";
import { createDatabaseNewsletterSignUp, getDatabaseNewsletterSignUp, getDatabaseNewsletterSignUps } from "./repositories";
import { CreateNewsletterSignUpData } from "./validation";

export const createNewsletterSignUp = async (data: CreateNewsletterSignUpData) => {
    const existingNewsletterSignUp = await getDatabaseNewsletterSignUp({ email: data.email });
    if (existingNewsletterSignUp) throw new ConflictError(`Email ('${data.email}') already subscribed`);

    const newsletterSignUp = await createDatabaseNewsletterSignUp(data);

    return newsletterSignUp;
};

export const getNewsletterSignUps = async () => {
    const newsletterSignUps = await getDatabaseNewsletterSignUps();

    return newsletterSignUps;
};