import { api } from "./axiosClient";


export const getLogin = (username: string, password: string) => {
  return api.post("/login", { username, password });
};

export const getSignup = (
  username: string,
  email: string,
  password: string
) => {
  return api.post("/signup", { username, email, password });
};
