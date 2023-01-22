import { WEATHER_API_KEY } from '../utils';
import IWeather from '../interfaces/IWeather';
import ICoordinates from '../interfaces/ICoordinates';

/** @see https://openweathermap.org/current */

export default async function fetchWeather({ lat, lon }: ICoordinates): Promise<IWeather> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  return fetch(url).then((res) => res.json());
}
