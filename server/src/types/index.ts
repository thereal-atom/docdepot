import type { NewsletterSignUp } from './../routes/newsletter/repositories';
import type { Document } from './../routes/document/repositories';
import type { CreateDocumentData } from "../routes/document/validation";
import type { CreateNewsletterSignUpData } from "../routes/newsletter/validation";

export {
    Document,
    CreateDocumentData,
    NewsletterSignUp,
    CreateNewsletterSignUpData,
};