import { Router, Request , Response } from "express";
import { CustomError } from "../utils/CustomError";
import { catchAsync } from "../middlewares/catchAsync";
import bcrypt from "bcryptjs";
import { pool } from "../database/db";
import { signJwt, verifyJwt } from "../utils/jwt";


const router = Router();


// testing without db

// const users: { 
//     email: string;
//     username: string;
//     password: string 
// }[] = [];




router.get("/verify",catchAsync(async (req: Request, res: Response) => {
    console.log("Cookies received:", req.cookies);

    const token = req.cookies.token;

    if (!token) {
      console.log("Verification failed: Token cookie is missing.");
      return res.status(401).send({
        msg: "Not authenicated",
      });
    }



    const payload = verifyJwt(token);

    if (!payload) {
      // LOG: If the token is invalid/expired
      console.log("Verification failed: Invalid or expired token.");
      return res.status(401).send({
        msg: "Invalid token",
      });
    }

    // LOG: If verification is successful
    console.log("Verification successful. Payload:", payload);

    res.status(200).send({
      id: payload,
    });
  })
);


router.post("/login",catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError("Username and password required");
    }

    const result = await pool.query("SELECT * FROM users WHERE name = $1", [
      username,
    ]);

    const user = result.rows[0];

    if (!user) {
      throw new CustomError("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError("Invalid username or password");
    }

    const token = signJwt({
      id: user.id,
      username: user.name,
    });

    // console.log(
    //   "LOGIN SUCCESS: Generated JWT Token:",
    //   token.substring(0, 50) + "..."
    // );

    
    const cookieOptions = {
      httpOnly: false,
      // MUST be false for plain http://localhost:3131
      secure: false,
      // FIX: Allows cookie to be sent on cross-port requests (5173 to 3131)
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 1000,
    };

    // console.log("LOGIN Done: Applying Cookie Options:", cookieOptions);

    res.cookie("token", token,cookieOptions);

    res.status(200).send({
      status: "success",
      message: "Logged in successfully",
      data: { username },
    });
  })
);

router.post("/signup",catchAsync(async(req: Request , res : Response)=>{
    const {email , username , password} = req.body;

    if(!username || !password || !email){
        throw new CustomError("Email , username and password are neccsary")
    }


    const existing = await pool.query(
        "SELECT * FROM users WHERE email = $1 OR name = $2",
        [email,username]
    );

    if (existing.rows.length > 0) {
      throw new CustomError("User with this email or username already exists");
    }



    // // const exitingUser = users.find((u) => u.username === username || u.email === email);

    // if(exitingUser){
    //     throw new CustomError("user with this email or username exits"); ///Task_1
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);


    const newUser = {email, username, password : hashedpassword};

    
    await pool.query(
        `INSERT INTO users (name, email , password) VALUES ($1, $2,$3)`,
        [username,email,hashedpassword]
    );
    // users.push(newUser);



    res.status(200).send({
        status: "success",
        message: "signup successfully",
        data: {email,username}
    })
}))


export default router;