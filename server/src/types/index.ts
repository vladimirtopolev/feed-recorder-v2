import { Request } from 'express-serve-static-core';

export type PaginationQuery = {
    limit: string,
    offset: string
}

export type PaginationRequest = Request<any, any, any, PaginationQuery>