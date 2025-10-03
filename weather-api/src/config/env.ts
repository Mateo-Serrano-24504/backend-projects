import dotenv from 'dotenv';

dotenv.config({path: ".env"});

export const CACHE_PORT = Number(process.env.CACHE_PORT);
export const CACHE_HOST = String(process.env.CACHE_HOST);
export const API_KEY = String(process.env.API_KEY);
export const API_URL = String(process.env.API_URL);
export const PORT = String(process.env.PORT);