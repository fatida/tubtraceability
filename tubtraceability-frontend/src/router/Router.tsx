import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home"
import ErrorPage from "../pages/errorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/*",
        element: <ErrorPage />
      }
    ],
  },
 
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
}

export default AppRouter;
