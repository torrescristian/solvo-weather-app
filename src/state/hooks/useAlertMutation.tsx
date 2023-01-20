import { useMutation, useQueryClient } from 'react-query';
import { getAlertKey, IAlert } from './useAlertQuery';

export default function useAlertMutation() {
  const queryClient = useQueryClient();
  
  return useMutation(async (props: IAlert) => {
    localStorage.setItem(getAlertKey(), JSON.stringify(props));

    queryClient.invalidateQueries(getAlertKey());
  });
}
