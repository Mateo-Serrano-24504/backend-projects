import { Router, Request, Response, NextFunction } from 'express';

import { WeatherController } from '../controller/weatherController';
import { WeatherService } from '../service/weatherService';
import { WeatherRepository } from '../repository/weatherRepository';
import { WeatherAdapter } from '../adapter/weatherAdapter';
import cache from '../database/cache'

const weatherAdapter = new WeatherAdapter();
const weatherRepository = new WeatherRepository(cache);
const weatherService = new WeatherService(weatherRepository, weatherAdapter);
const weatherController = new WeatherController(weatherService);

export const weatherRouter = Router();

weatherRouter.get('/:city', async (req: Request, res: Response) => {
    console.log(`Request received at ${req.originalUrl}`);
    weatherController.getWeather(req, res);
});