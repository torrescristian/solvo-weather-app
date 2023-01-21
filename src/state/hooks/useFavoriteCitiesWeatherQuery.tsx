import { useQuery } from 'react-query';
import IWeather from '../interfaces/IWeather';
import fetchWeather from '../services/fetchWeather';
import useFavoriteCitiesQuery, { getFavoriteCitiesKey } from './useFavoriteCitiesQuery';

export const getFavoriteCitiesWeatherKey = (citiesAmount: number) => [getFavoriteCitiesKey(), 'weather', citiesAmount];

export default function useFavoriteCitiesWeatherQuery() {
  const fcq = useFavoriteCitiesQuery();

  return useQuery<IWeather[]>({
    queryKey: getFavoriteCitiesWeatherKey(fcq.data?.length || 0),
    queryFn: async () => {
      const res = await Promise.all(fcq.data!.map(fetchWeather));

      return res;
    },
    enabled: fcq.isSuccess,
    initialData: () => [],
  });
}
