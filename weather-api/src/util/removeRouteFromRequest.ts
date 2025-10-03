import { Request } from 'express';

export const removeRouteFromRequest = (req: string): string => {
    return req.replace(/^\/weather\//, "");
};