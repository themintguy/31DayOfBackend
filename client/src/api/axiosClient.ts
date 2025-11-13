import axios from "axios";

export const API_URL_AUTH = "http://localhost:3131";

export const api = axios.create({
  baseURL: API_URL_AUTH,
  withCredentials: true, 
});
