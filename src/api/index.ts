import axios from "axios";

/**
 * API client for the public routes
 */
export const adminApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});