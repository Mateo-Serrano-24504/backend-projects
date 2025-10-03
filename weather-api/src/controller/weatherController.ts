import { Request, Response } from "express";

import { WeatherService } from "../service/weatherService"

export class WeatherController {
    weatherService: WeatherService;

    constructor(weatherService: WeatherService) {
        this.weatherService = weatherService;
    }

    async getWeather(req: Request, res: Response): Promise<void> {
        try {
            res.json(await this.weatherService.getWeather(req));
        } catch (error) {
            res.send(`${error}`)
               .status(500)
               .end();
        }
    }
};