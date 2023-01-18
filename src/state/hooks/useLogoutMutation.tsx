import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getConnectedKey, IConnectedResult } from "./useConnected";

export default function useLogoutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (): Promise<void> => {
    localStorage.setItem(
      getConnectedKey(),
      JSON.stringify({
        isConnected: false,
      } as IConnectedResult)
    );

    setTimeout(() => {
      queryClient.invalidateQueries(getConnectedKey());

      navigate('/');
    }, 1000);
  });
}
