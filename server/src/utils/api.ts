export class APIError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    };
};

export class ConflictError extends APIError {
    constructor(message: string) {
        super(409, message);
    };
};