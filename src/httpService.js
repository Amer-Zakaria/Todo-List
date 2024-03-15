import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const isExpectedError =
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status < 500;

    if (error.response?.status === 401) {
      window.history.pushState({}, "", "/todo-list/sign-in?isAuthError=true");
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

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};
