import express from 'express';
import connectDb from './Db/index.js';
import cors from 'cors';

const app = express();
connectDb();
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("server running successfully");
});

export default app;