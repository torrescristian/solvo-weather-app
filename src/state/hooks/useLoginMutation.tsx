import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getConnectedKey, IConnectedResult } from './useConnected';

export interface ILoginProps {
  email: string;
  password: string;
}

export const MOCK_USER: ILoginProps = {
  email: 'admin@admin.com',
  password: 'admin',
};

export default function useLoginMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ email, password }: ILoginProps): Promise<void> => {
      if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
        throw new Error('Invalid Credentials');
      }

      localStorage.setItem(
        getConnectedKey(),
        JSON.stringify({
          isConnected: true,
        } as IConnectedResult)
      );

      setTimeout(() => {
        queryClient.invalidateQueries(getConnectedKey()).then(() => {
          navigate('/dashboard');
        });
      }, 1000);
    }
  );
}
