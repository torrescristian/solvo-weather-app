import { useMutation, useQueryClient } from 'react-query';
import ICoordinates from '../interfaces/ICoordinates';
import useFavoriteCitiesQuery, {
  getFavoriteCitiesKey,
} from './useFavoriteCitiesQuery';

export default function useToggleAlertMutation() {
  const favoriteCities = useFavoriteCitiesQuery();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ lat, lon }: ICoordinates) => {
      if (!favoriteCities.data) return;

      const newFavoriteCities = favoriteCities.data.map((fc) =>
        fc.lat === lat && fc.lon === lon
          ? { ...fc, alertEnabled: !fc.alertEnabled }
          : fc
      );

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
