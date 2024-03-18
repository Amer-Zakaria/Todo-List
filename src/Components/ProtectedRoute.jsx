import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { storeToken } from "./../Utils/token";

const ProtectedRoute = ({ Element, ...props }) => {
  //Store cookies if it exist in the url query string
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("token")) {
      const token = searchParams.get("token");
      searchParams.delete("token");
      setSearchParams(searchParams);
      storeToken(token);
    }
  }, []);

  return !Cookies.get("TLAccessToken") ? (
    <Navigate to="/sign-in" replace />
  ) : (
    <Element {...props} />
  );
};

export default ProtectedRoute;
