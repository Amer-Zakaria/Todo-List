import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import http from "./httpService";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <ProtectedRoute Element={Home} />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/sign-up`,
    element: <Signup />,
  },
  {
    path: `/sign-in`,
    element: <SignIn />,
  },
  {
    path: `/google-error`,
    element: (
      <ErrorPage
        errorMessage={
          "Something went wrong while trying to log you in with Google"
        }
      />
    ),
  },
]);

function App() {
  //Fire a request when app mounts  so that the server gets awakened
  useEffect(async () => {
    await http
      .get("", { baseURL: process.env.REACT_APP_API_URL.split("/api")[0] })
      .catch((e) => {});
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
