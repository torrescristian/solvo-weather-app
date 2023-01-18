import { useMutation, useQueryClient } from 'react-query';
import ICoordinates from '../interfaces/ICoordinates';
import IWeather from '../interfaces/IWeather';
import useFavoriteCitiesQuery, {
  getFavoriteCitiesKey,
} from './useFavoriteCitiesQuery';

export default function useToggleFavoriteMutation() {
  const favoriteCities = useFavoriteCitiesQuery();
  const queryClient = useQueryClient();

  return useMutation(async (weather: IWeather) => {
    const { lat, lon } = weather.coord;

    if (!favoriteCities.data) return;

    const found = favoriteCities.data.find(
      (fc) => fc.lat === lat && fc.lon === lon
    );

    const newFavoriteCities: ICoordinates[] = found
      ? favoriteCities.data.filter((fc) => fc.lat !== lat && fc.lon !== lon)
      : [...favoriteCities.data, { lat, lon }];

    localStorage.setItem(
      getFavoriteCitiesKey(),
      JSON.stringify(newFavoriteCities)
    );

    queryClient.invalidateQueries(getFavoriteCitiesKey());
  });
}
