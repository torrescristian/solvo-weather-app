import { Navigate } from 'react-router-dom';
import useConnected from '../state/hooks/useConnected';

export default function RequireAuth({ children }: any) {
  const { isConnected } = useConnected();

  return isConnected ? children : <Navigate to="/" replace />;
}
