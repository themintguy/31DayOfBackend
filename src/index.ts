import express from "express";

import spamRoutes from "./routes/userRouters"
import movieRoutes from "./routes/movieRouters"


const app = express();
const PORT = 3131;


app.use(express.json());

app.use("/auth",spamRoutes);
app.use("/",movieRoutes);



// app.get('/', (req, res) => {
//   res.send('Home Page');
// });


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:3131`);
});