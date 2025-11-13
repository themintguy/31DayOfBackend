import { api, } from "./axiosClient";


export const getLogin = (username: string, password: string) => {
  return api.post("/auth/login", { username, password });
};

export const getSignup = (
  username: string,
  email: string,
  password: string
) => {
  return api.post("/auth/signup", { username, email, password });
};



export const getUserUsername = (username: string)=>{
  return api.get(`/user-info/${username}`)
};

export const transferMoney = ( receiverEmail:string ,amount:number )=>{
  return api.patch("/transfer",{receiverEmail,amount});
}







