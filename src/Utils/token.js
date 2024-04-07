import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import http from "../httpService";

export function storeTokens({ token = "", refreshToken = "" }) {
  if (refreshToken) {
    Cookies.set("TLRefreshToken", refreshToken, {
      expires: 365,
    });
  }

  if (token) {
    const decoded = jwtDecode(token);
    const ExpirationTime = new Date((decoded.exp - 60) * 1000); //expieration time minus a min
    const CurrentTime = new Date();
    Cookies.set("TLAccessTokenExpiresAtInMSec", Date.parse(ExpirationTime), {
      expires: 365,
    });
    // Get total seconds between the two times
    var secondsToExpire = Math.abs(ExpirationTime - CurrentTime) / 1000;
    // Extract the number of days
    var daysToExpire = secondsToExpire / 86400;
    Cookies.set("TLAccessToken", token, {
      expires: daysToExpire,
    });
  }
}

export async function regenerateToken(navigate) {
  const refreshToken = getRefreshToken();

  return (await http.post("/auth/token", { refreshToken })).headers[
    "x-auth-token"
  ];
}

export function getTokenExperationDateInMSec() {
  return Cookies.get("TLAccessTokenExpiresAtInMSec");
}

export function getToken() {
  return Cookies.get("TLAccessToken");
}

export function getRefreshToken() {
  return Cookies.get("TLRefreshToken");
}

export function removeTokens() {
  Cookies.remove("TLAccessToken");
  Cookies.remove("TLRefreshToken");
  Cookies.remove("TLAccessTokenExpiresAtInMSec");
}
