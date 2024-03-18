import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function storeToken(token = "") {
  if (token) {
    const decoded = jwtDecode(token);
    const ExpirationTimeInSec = new Date((decoded.exp - 60) * 1000); //expieration time minus a min
    const CurrentTimeInSec = new Date();
    // Get total seconds between the two times
    var secondsToExpire =
      Math.abs(ExpirationTimeInSec - CurrentTimeInSec) / 1000;
    // Extract the number of days
    var daysToExpire = secondsToExpire / 86400;
    console.log(daysToExpire);
    Cookies.set("TLAccessToken", token, {
      expires: daysToExpire,
    });

    window.history.pushState({}, "", "/");
    window.location.reload();
  }
}

export function getToken() {
  return Cookies.get("TLAccessToken");
}
