import { Request } from 'express';

import { API_KEY } from '../config/env'

export const appendKeyToRequest = (req: Request): string => {
    let newReq = req.originalUrl + (req.query ? '&' : '?') + `key=${API_KEY}`;
    return newReq;
};