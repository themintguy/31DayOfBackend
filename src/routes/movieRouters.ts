import { Router , Request , Response } from "express";
import moviedb from "../database/movies"

const router = Router();

router.get("/",(req : Request , res : Response)=>{
    // try{


    // }
    // catch (err){
    //     console.log(err);
    // }

    res.send(moviedb);
})

router.post("/",(req:Request , res : Response)=>{

    const maxId = moviedb.length > 0 ? Math.max(... moviedb.map(n => Number(n.id))):0;




    const {name , director , year , genre , rating} = req.body;

    if(!name || !director || !year || !genre || !rating){
        return res.status(400).send({
            msg :" invalid data , add all fields"
        })
    
}


    const newMovie = {
        id : maxId+1,
        name,
        director,
        year : Number(year),
        genre,
        rating : Number(rating)
    }
    moviedb.push(newMovie);
    


    return res.status(201).send({
        msg : "New Movie created sucessfully",
        movie : newMovie
    })


})

export default router;