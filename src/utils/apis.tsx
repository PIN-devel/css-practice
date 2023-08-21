import axios from "axios";
import { PropsWithChildren, createContext, useContext } from "react";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiContext = createContext(axiosInstance);

/**
 * @deprecated
 */
const useApi = () => useContext(ApiContext);

/**
 * @deprecated
 */
const ApiProvider = ({ children }: PropsWithChildren) => (
  <ApiContext.Provider value={axiosInstance}>{children}</ApiContext.Provider>
);

export { ApiProvider, useApi };
