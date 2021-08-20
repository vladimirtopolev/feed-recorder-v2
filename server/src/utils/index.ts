import {PaginationQuery} from '../types';

export const getPageFrame = <T> (entities: T[], options: PaginationQuery): T[] => {
    const limit = +options.limit || 10;
    const offset = +options.offset || 0;
    return entities.slice(offset, offset + limit);
}