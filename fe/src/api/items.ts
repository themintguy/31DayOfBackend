import axios from "axios";


const API_URL = "http://localhost:3131/items";

export const createItem = (data : {
    id: string,
    name: string
}) => axios.post(API_URL,data);


export const getItems = ()=> axios.get(API_URL);

export const getItem = (id: string) => axios.get(`${API_URL}/${id}`);

export const updateItem = (id: string , data : {name:string}
) => axios.put(`${API_URL}/${id}`,data);

export const deleteItem = (id:string) => axios.delete(`${API_URL}/${id}`);


