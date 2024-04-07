import axios from "axios";
import { toast } from "react-toastify";
import {
  storeTokens,
  getToken,
  getTokenExperationDateInMSec,
  getRefreshToken,
} from "./Utils/token";

export const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (config) => {
    const isAccessTokenExpired =
      Date.parse(new Date()) > getTokenExperationDateInMSec();

    if (isAccessTokenExpired)
      config.headers["x-refresh-token"] = getRefreshToken();
    else config.headers["x-auth-token"] = getToken();

    return config;
  },
  (err) => Promise.reject(err),
  { synchronous: true }
);

axios.interceptors.response.use(
  (response) => {
    storeTokens({
      token: response.headers["x-auth-token"],
      refreshToken: response.headers["x-refresh-token"],
    });

    return response.data;
  },
  async (error) => {
    const isExpectedError =
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status < 500;

    if (error.response?.status === 401 || error.response?.status === 403) {
      window.history.pushState({}, "", "/sign-in?isAuthError=true");
      window.location.reload();
    } else if (error.response?.status === 404) {
      toast.error("Not Found!");
    } else if (!isExpectedError) {
      toast.error("An unexpected error occurrred.");
    } else toast.error(error.response.data.message ?? false);

    error.isExpectedError = isExpectedError;

    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};

export default http;
