import { Request , Response , NextFunction} from "express";


function checkAge(req : Request , res : Response , next : NextFunction){


    // usernames if userrname and password matches 
    const {age} = req.body;


    if(!age){
        return res.status(400).send({
            msg:"Age is required"
        })
    }
    // in data base 
    // if user is presen

    if(age < 18){
        return res.status(403).send({
            msg : "You are too younger"
        })
    }
    next(); // home page of mine
}

export default checkAge;
