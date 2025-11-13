import { Request , Response , Router } from "express";
import { catchAsync } from "../middlewares/catchAsync";
import { CustomError } from "../utils/CustomError";
import { pool } from "../database/db";

const router = Router();


router.get("/:username", catchAsync (async(req:Request , res:Response)=>{

    const {username} = req.params;

    if(!username){
        throw new CustomError('username is req');
    }

    
    const result = await pool.query(
        'SELECT money, balance FROM users WHERE name = $1',
        [username]
    );

    const user = result.rows[0];

    if(!user){
        throw new CustomError("user not found");
    }

    res.status(200).send({
        status:"success",
        data:{
            username,
            money : user.money,
            balance: user.balance
        }
    })
}));


router.patch("/:id/money", catchAsync( async( req: Request , res: Response)=>{
    const {id} = req.params;

    if(!id){
        throw new CustomError('id id req');
    }

    const result = await pool.query(
        `UPDATE users 
        SET money = money+1 , updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;`,
        [id]
    );

    if(result.rowCount === 0){
        return res.status(404).send({
            error:"User not found"
        });
    }

    const user = result.rows[0];

    res.status(200).send({
        status:"success",
        data:{
            id:user.id,
            money:user.money,
            balance:user.balance,
        }
    })
}))

export default router;