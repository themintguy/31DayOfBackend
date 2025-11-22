import { Router , Request , Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../database/db";

const router = Router();

router.post("/login", async (req: Request , res : Response)=>{

    const {username , password} = req.body;

     if(!username || !password){
    res.status(404).send({
       status: "all fields are must",
    })
}

const result = await pool.query(`SELECT * FROM users WHERE username = $1`,[username]);

const user = result.rows[0];

const isMatchPassword = await bcrypt.compare(password,user.password);


if(isMatchPassword){
    res.status(200).send({
      status: "sucess",
      message: "Login in sucessfully",
      data: { username },
    });
} else{
    res.status(404).send({
      status: "failss",
      message: "Loginfailkedy",
      data: { username },
    });
}


});






router.post("/signup", async (req:Request , res: Response)=>{
    const { username,email , password} = req.body;

    if(!username || !email || !password){
    res.status(404).send({
       status: "all fields are must",
    })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);

    const newUser = { username,email  , password : hashedpassword};
    await pool.query(`INSERT INTO users (username,email,password) VALUES ($1,$2,$3)`,
        [username , email,  hashedpassword  ]);


        res.status(200).send({
            status:"success",
            message:"done ",
            data:{email,username}
        })
});

export default router;