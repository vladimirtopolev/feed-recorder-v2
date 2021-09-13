import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ErrorRequestHandler } from 'express';
import ApiError from '../utils/appError';
import { Error } from 'mongoose';

export const errorConverter: ErrorRequestHandler = (error, req, res, next) => {
    // handle AuthorizarionError comes from express-jwt
    if (error.name === 'UnauthorizedError') {
        return next(new ApiError(httpStatus.UNAUTHORIZED, error.message));
    }
    if (!(error instanceof ApiError)) {
        // handle separately mongo validation issues and any schema violetions
        if (error instanceof Error.ValidationError) {
            return next(new ApiError(httpStatus.BAD_REQUEST, error.message));
        }
        const statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        return next(new ApiError(statusCode, message, error.stack));
    }
    next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode, message } = err;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(statusCode).json(response);
};
