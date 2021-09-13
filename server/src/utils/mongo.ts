export const createModifier = function <T>(availableFields: (keyof T)[], body: Partial<T>) {
    return availableFields.reduce((memo, field) => ({...memo, [field]: body[field]}), {} as Partial<T>);
};