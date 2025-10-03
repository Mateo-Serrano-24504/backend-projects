import { Request } from 'express'

import { WeatherRepository } from '../repository/weatherRepository'
import { WeatherAdapter } from '../adapter/weatherAdapter'
import { appendKeyToRequest } from '../util/appendKeyToRequest';
import { removeRouteFromRequest } from '../util/removeRouteFromRequest';

export class WeatherService {
    weatherRepository: WeatherRepository;
    weatherAdapter: WeatherAdapter;

    constructor(weatherRepository: WeatherRepository, weatherAdapter: WeatherAdapter) {
        this.weatherRepository = weatherRepository;
        this.weatherAdapter = weatherAdapter;
    }

    async getWeather(req: Request): Promise<unknown> {
        const key = req.originalUrl;
        let data = await this.weatherRepository.getWeather(key);

        if (!data) {
            console.log('Cache miss, fetching from API...');
            let newReq = removeRouteFromRequest(appendKeyToRequest(req));
            data = await this.weatherAdapter.getWeather(newReq);
            await this.weatherRepository.saveWeather(key, data);
        }

        return data;
    }
};