import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export function storeTokens({ token = "", refreshToken = "" }) {
  if (refreshToken) {
    Cookies.set("TLRefreshToken", refreshToken, {
      expires: 365,
    });
  }

  if (token) {
    const decoded = jwtDecode(token);
    Cookies.set("TLUser", decoded, { expires: 1 });
    Cookies.set("TLAccessToken", token, {
      expires: 1,
    });
  }
}

export function getTokenExperationDateInMSec() {
  return jwtDecode(getToken()).exp * 1000;
}

export function getToken() {
  return Cookies.get("TLAccessToken");
}

export function getRefreshToken() {
  return Cookies.get("TLRefreshToken");
}

export function getUser() {
  return Cookies.get("TLUser") ? JSON.parse(Cookies.get("TLUser")) : null;
}

export function removeTokens() {
  Cookies.remove("TLAccessToken");
  Cookies.remove("TLRefreshToken");
  Cookies.remove("TLUser");
}
