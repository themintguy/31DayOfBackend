import express from "express";
import ageMiddleware from "./middlewares/checkAge"
import getAcess from "./controllers/ageController"


const app = express();
const PORT = 3131;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/auth',ageMiddleware ,getAcess)

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:3131`);
});