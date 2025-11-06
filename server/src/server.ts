import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/UserRoutes"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();



const app: Application = express();



app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
})); 
app.use(cookieParser());
app.use(morgan("dev")); 
app.use(express.json()); 

// app.get(
//   "/api",
//   catchAsync(async (req, res) => {
//     // simulate error
//     throw new CustomError("This is a custom error", 400);
//   })
// );



app.use("/auth",authRoutes);


app.use(errHandler);

export default app;
