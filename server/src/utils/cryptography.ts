import { randomBytes } from "crypto"

export const generatePasswordHash = async (password: string): Promise<{
    hashedPassword: string;
    salt: string;
}> => {
    const salt = randomBytes(16).toString("hex");

    const hashedPassword = await Bun.password.hash(`${password}:${salt}`);

    return {
        hashedPassword,
        salt,
    };
};

export const verifyPassword = async (password: string, salt: string, hashedPassword: string): Promise<boolean> => {
    const isValid = await Bun.password.verify(`${password}:${salt}`, hashedPassword);

    return isValid;
};