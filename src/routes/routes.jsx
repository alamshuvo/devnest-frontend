import { createBrowserRouter } from "react-router-dom";

// Pages

// Layout

import MainLayout from "../Layout/MainLayout";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";

const router = createBrowserRouter([
 
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
