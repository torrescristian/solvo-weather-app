import { WEATHER_API_KEY } from '../utils';

export const getGeocodingQueryKey = () => ['geocoding'];

/** @see https://openweathermap.org/api/geocoding-api#direct_zip */

export interface IGeoCodingProps {
  query: string;
  countryCode: string;
}

export interface IGeoCoding {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export default async function fetchGeocoding({
  countryCode,
  query,
}: IGeoCodingProps): Promise<IGeoCoding | null> {
  const createUrlByZipCode = () => {
    return `http://api.openweathermap.org/geo/1.0/zip?zip=${query},${countryCode}&appid=${WEATHER_API_KEY}`;
  };

  const createUrlByCityName = () => {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)},${countryCode}&appid=${WEATHER_API_KEY}`;
  };

  const queryIsZipCode = Number.isInteger(Number(query));

  const url = queryIsZipCode ? createUrlByZipCode() : createUrlByCityName();

  let response = await fetch(url).then((res) => res.json());

  response = Array.isArray(response) ? response[0] : response;

  if (!response || response.cod === '404') return null;

  return response;
}
