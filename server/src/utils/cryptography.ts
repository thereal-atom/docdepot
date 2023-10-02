import { randomBytes } from "crypto"

export const generatePasswordHash = (password: string): {
    hashedPassword: string;
    salt: string;
} => {
    const salt = randomBytes(16).toString("hex");

    const hashedPassword = Bun.password.hashSync(`${password}:${salt}`);

    return {
        hashedPassword,
        salt,
    };
};

export const verifyPassword = (password: string, salt: string, hashedPassword: string): boolean => {
    const isValid = Bun.password.verifySync(`${password}:${salt}`, hashedPassword);

    return isValid;
};