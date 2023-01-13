import { Box } from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./pages/Login/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <Box>
      <Navbar />
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
