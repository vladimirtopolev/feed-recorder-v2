import {RequestHandler} from 'express';
import {AnySchema} from 'yup'
import ApiError from '../utils/appError';
import httpStatus from 'http-status';


export const checkRequest = (schema: AnySchema): RequestHandler => async (req, res, next) => {
    try{
        const isValid = await schema.isValid(req.body);
        next();
    } catch (e){
        throw new ApiError(httpStatus.BAD_REQUEST, e.message);
    }
};