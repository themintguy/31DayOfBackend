import { Request , Response } from "express";


function getAcessofAdult(req:Request , res:Response){

// // data base -->>
// if its hows the data



    res.status(200).send({
        msg :"Welcome to Adulthood where problems starts"
    })
}

export default getAcessofAdult;

