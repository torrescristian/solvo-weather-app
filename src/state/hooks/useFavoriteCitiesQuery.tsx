import { useQuery } from 'react-query';
import ICoordinates from '../interfaces/ICoordinates';

export const getFavoriteCitiesKey = () => 'favorite-cities';

export default function useFavoriteCitiesQuery() {
  return useQuery<ICoordinates[]>({
    queryKey: getFavoriteCitiesKey(),
    queryFn: async () => {
      const stringValue = localStorage.getItem(getFavoriteCitiesKey()) || '[]';
      
      return JSON.parse(stringValue);
    },
  });
}
