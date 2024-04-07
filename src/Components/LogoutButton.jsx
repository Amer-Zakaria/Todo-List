import React from "react";
import http from "../httpService";
import { useNavigate } from "react-router-dom";
import { getRefreshToken, removeTokens } from "../Utils/token";

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleLoguot() {
    try {
      await http.delete("/auth/logout", {
        headers: { ["x-refresh-token"]: getRefreshToken() },
      });
      navigate("/sign-in");
      removeTokens();
    } catch (err) {}
  }

  return (
    <button className="logout button-clear" onClick={handleLoguot}>
      Logout
    </button>
  );
}
