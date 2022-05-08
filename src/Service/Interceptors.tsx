import axios from "axios";
import { store } from "../Store/MyStore";

export const bearerInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_KEY}`,
});

bearerInstance.interceptors.request.use(
  (config: any) => {
    const token = store.getState().token;
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

export const contentInstace = axios.create({
  baseURL: `${process.env.REACT_APP_API_KEY}`,
});

contentInstace.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);
