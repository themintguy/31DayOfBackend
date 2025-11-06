import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "jwtsupersecretkey";
const JWT_EXPIRES = "1h";


export const signJwt = (payload: object) =>{
    return jwt.sign(payload,JWT_SECRET,{
        expiresIn:JWT_EXPIRES
    });
};

export const verifyJwt = (token:string) =>{
    try{
        return jwt.verify(token,JWT_SECRET);
    } catch(err){
        console.error("Jwt failed",err);
        return null;
    }
}


