import { useMutation, useQueryClient } from 'react-query';
import ICoordinates from '../interfaces/ICoordinates';
import useFavoriteCitiesQuery, {
  getFavoriteCitiesKey,
  IFavorite,
} from './useFavoriteCitiesQuery';

export default function useToggleFavoriteMutation() {
  const favoriteCities = useFavoriteCitiesQuery();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ lat, lon }: ICoordinates) => {
      if (!favoriteCities.data) return;

      const found = favoriteCities.data.find(
        (fc) => fc.lat === lat && fc.lon === lon
      );

      const newFavoriteCities: IFavorite[] = found
        ? favoriteCities.data.filter((fc) => fc.lat !== lat && fc.lon !== lon)
        : [...favoriteCities.data, { lat, lon, alertEnabled: false }];

      localStorage.setItem(
        getFavoriteCitiesKey(),
        JSON.stringify(newFavoriteCities)
      );
    },
    {
      onSuccess: () => queryClient.invalidateQueries(getFavoriteCitiesKey()),
    }
  );
}
