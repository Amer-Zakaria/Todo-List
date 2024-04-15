import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SendEmailVerificationLink from "./pages/SendEmailVerificationLink.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import "./httpService";
import ForgotPass from "./pages/ForgotPass.jsx";
import SendPassResetLink from "./pages/SendPassResetLink.jsx";
import ResetPass from "./pages/ResetPass.jsx";

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
    path: `/send-email-verification`,
    element: <ProtectedRoute Element={SendEmailVerificationLink} />,
  },
  {
    path: `/forgot-pass`,
    element: <ForgotPass />,
  },
  {
    path: `/send-pass-reset-link`,
    element: <SendPassResetLink />,
  },
  {
    path: `/reset-pass`,
    element: <ResetPass />,
  },
  {
    path: `/email-validation-error`,
    element: (
      <ErrorPage
        errorMessageAlternative={
          "Something went wrong while trying to verify your email"
        }
        errorTitle="An Error occured while verifying your email."
      />
    ),
  },
  {
    path: `/google-error`,
    element: (
      <ErrorPage
        errorMessageAlternative={
          "Something went wrong while trying to log you in with Google"
        }
      />
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
