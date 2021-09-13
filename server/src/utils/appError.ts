export default class ApiError extends Error {
    constructor(public statusCode: number, message: string, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.stack = stack;
    }
}
