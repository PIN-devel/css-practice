import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getPostListApi = (skip: number, limit: number) =>
  axiosInstance.get(`/posts?skip=${skip}&limit=${limit}`);

export { getPostListApi };
