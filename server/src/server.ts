import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { errHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/UserRoutes"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/getInfoRoutes";
import transactionsRoutes from "./routes/userTranscations";
import sendMoney from "./routes/userTranscations"


const app: Application = express();



app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
})); 
app.use(cookieParser());
app.use(morgan("dev")); 
app.use(express.json()); 


app.use("/transactions",transactionsRoutes)
app.use("/auth",authRoutes);
app.use("/user-info",userRoutes);
app.use("/",sendMoney)


app.use(errHandler);

export default app;
