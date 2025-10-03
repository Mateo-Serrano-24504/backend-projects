export class WeatherAdapter {
    constructor() {}
    async getWeather(request: string): Promise<unknown> {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${request}`;
        console.log(`Redirecting request to ${url}`);
        let weatherData = await fetch(url);
        if (!weatherData.ok) {
            throw new Error("Failed to get weather data");
        }
        return weatherData.json();
    }
};