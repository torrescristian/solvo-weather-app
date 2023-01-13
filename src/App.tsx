import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequireAuth from './components/RequiredAuth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './pages/Login/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
