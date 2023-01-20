import { useQuery } from 'react-query';
import ICoordinates from '../interfaces/ICoordinates';

export interface IFavorite extends ICoordinates {
  alertEnabled: boolean;
}

export const getFavoriteCitiesKey = () => 'favorite-cities';

export default function useFavoriteCitiesQuery() {
  return useQuery<IFavorite[]>({
    queryKey: getFavoriteCitiesKey(),
    queryFn: async () => {
      const stringValue = localStorage.getItem(getFavoriteCitiesKey()) || '[]';
      
      return JSON.parse(stringValue);
    },
  });
}
