export const getConnectedKey = () => 'isConnected';

export interface IConnectedResult {
  isConnected: boolean;
}

export default function useConnected(): IConnectedResult {
  const stringResult =
    localStorage.getItem(getConnectedKey()) || '{"isConnected":false}';

  return JSON.parse(stringResult);
}
