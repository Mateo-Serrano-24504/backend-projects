import Keyv from 'keyv';

export class WeatherRepository {
    cache: Keyv<any>;

    constructor(cache: Keyv<any>) {
        this.cache = cache;
    }

    async getWeather(query: string): Promise<unknown | null> {
        return this.cache.get(query) ?? null;
    }

    async saveWeather(query: string, data: unknown): Promise<void> {
        await this.cache.set(query, data);
    }
};