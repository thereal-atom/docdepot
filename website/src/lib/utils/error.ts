export class APIError extends Error {
    code: number;
    statusCode: number;

    constructor(code: number, message: string) {
        super(message);

        this.code = code;
        this.statusCode = code;
    };
};