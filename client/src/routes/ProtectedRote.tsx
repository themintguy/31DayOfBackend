import axios from "axios";
import { useEffect, useState, } from "react";
import { API_URL_AUTH } from "../api/axiosClient";
import { Navigate } from "react-router-dom";
import React from "react";



interface ProtectedRouteProps {
  children: React.ReactElement;
}


const ProtectedRoute = ({children}: ProtectedRouteProps) => {


    const [isAuth , setIsAuth] = useState<boolean | null >(null);


    useEffect(()=>{
        const checkAuth = async()=>{
            try{
                await axios.get(`${API_URL_AUTH}/verify`, { withCredentials: true })
                setIsAuth(true);
            } catch{
                setIsAuth(false);
            }
        };

        checkAuth();
    },[]);


    if(isAuth === null)  return <h1>Loadingh1 </h1>;
    if(!isAuth) return <Navigate to="/login" replace />

    return children;
}

export default ProtectedRoute;