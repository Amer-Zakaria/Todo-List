import axios from "axios";
import { toast } from "react-toastify";
import { storeToken, getToken } from "./Utils/token";

export const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.headers["x-auth-token"] = getToken();
axios.defaults.baseURL = baseURL;

axios.interceptors.response.use(
  (response) => {
    storeToken(response.headers["x-auth-token"]);

    return response.data;
  },
  async (error) => {
    const isExpectedError =
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status < 500;

    if (error.response?.status === 401) {
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
