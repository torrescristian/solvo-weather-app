import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequireAuth from './components/RequiredAuth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { ReactQueryDevtools } from 'react-query/devtools';
import useSWRegister from './state/hooks/useSWRegister';
import Navbar from './pages/Login/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  useSWRegister();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
