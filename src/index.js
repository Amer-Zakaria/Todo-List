import React from "react";
import ReactDOM from "react-dom";
import "./CSS/normalize.css";
import "./CSS/index.css";
import "./CSS/milligram.css";
import "./CSS/App.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./pages/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <ProtectedRoute Element={App} />,
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

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
