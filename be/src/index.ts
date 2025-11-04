import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items";



const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3131;

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use("/items",itemsRouter)

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:3131`);
});