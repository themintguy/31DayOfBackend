import app from "./server";

const PORT = 3131;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
