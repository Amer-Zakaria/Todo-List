import React, { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getRefreshToken, storeTokens } from "./../Utils/token";

const ProtectedRoute = ({ Element, ...props }) => {
  const navigate = useNavigate();

  //Store cookies if it exist in the url query string
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("accessToken") && searchParams.has("refreshToken")) {
      const token = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      searchParams.delete("accessToken");
      searchParams.delete("refreshToken");
      setSearchParams(searchParams);
      storeTokens({ token, refreshToken });
      navigate("/");
    }
  }, []);

  return !getRefreshToken() ? (
    <Navigate to="/sign-in" replace />
  ) : (
    <Element {...props} />
  );
};

export default ProtectedRoute;
