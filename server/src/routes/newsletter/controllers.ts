import { createDatabaseNewsletterSignUp, getDatabaseNewsletterSignUps } from "./repositories";
import { CreateNewsletterSignUpData } from "./validation";

export const createNewsletterSignUp = async (data: CreateNewsletterSignUpData) => {
    const newsletterSignUp = await createDatabaseNewsletterSignUp(data);

    return newsletterSignUp;
};

export const getNewsletterSignUps = async () => {
    const newsletterSignUps = await getDatabaseNewsletterSignUps();

    return newsletterSignUps;
};