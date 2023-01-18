import { WEATHER_API_KEY } from '../utils';
import IWeather from '../interfaces/IWeather';
import ICoordinates from '../interfaces/ICoordinates';

/** @see https://openweathermap.org/current */

export default async function fetchWeather({ lat, lon }: ICoordinates): Promise<IWeather> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  // TODO: uncomment
  // return fetch(url).then((res) => res.json());
  return mock();
}

function mock() {
  return {
    coord: {
      lon: -64.175,
      lat: -31.425,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    base: 'stations',
    main: {
      temp: 305.78,
      feels_like: 305.13,
      temp_min: 305.46,
      temp_max: 308.12,
      pressure: 1009,
      humidity: 33,
      sea_level: 1009,
      grnd_level: 966,
    },
    visibility: 10000,
    wind: {
      speed: 0.59,
      deg: 268,
      gust: 3.77,
    },
    clouds: {
      all: 89,
    },
    dt: 1673986249,
    sys: {
      type: 2,
      id: 2036100,
      country: 'AR',
      sunrise: 1673947718,
      sunset: 1673997863,
    },
    timezone: -10800,
    id: 3860259,
    name: 'Córdoba',
    cod: 200,
  } as IWeather;
}
