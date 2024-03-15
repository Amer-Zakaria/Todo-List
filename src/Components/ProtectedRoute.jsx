import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ Element, ...props }) => {
  return !Cookies.get("TLAccessToken") ? (
    <Navigate to="/sign-in" replace />
  ) : (
    <Element {...props} />
  );
};

export default ProtectedRoute;
