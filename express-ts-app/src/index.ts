import express, { Request, Response } from 'express';
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;

let notes = [
  {
    id: "1",
    body: "HTTP",
    topic: "Backend",
  },
  {
    id: "2",
    body: "Routes",
    topic: "Backend",
  },
  {
    id: "3",
    body: "Ser and Deser",
    topic: "Backend",
  },
 
];

app.use(express.json());

app.use(cors());

// app.use(JSON.());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript + PNPM + !');
});

app.get("/docs", (req: Request, res: Response) => {
 res.send(notes);
});

app.get('/docs/:id',(req : Request , res:Response)=>{
  const id = req.params.id;
  const note = notes.find(note => note.id === id)
  res.status(200).send(note);
})

app.delete('/docs/:id' , (req:Request , res: Response) => {
  const id = req.params.id;
  notes = notes.filter(note => note.id !== id)
  res.status(204).end();
})

console.log(notes.length)

app.post('/docs',(req:Request , res: Response)=>{

  // const maxId = notes.length;
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))):0

  const note = req.body;
  note.id = String(maxId +1);

  notes = notes.concat(note);

  res.status(201).send(notes);


})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
