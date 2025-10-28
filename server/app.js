import express from 'express';
import connectDb from './Db/index.js';
import cors from 'cors';
import userRouter from './Routes/User.Route.js';
import resumeRouter from './Routes/Resume.Route.js';
import aiRouter from './Routes/Ai.Routes.js';

const app = express();
connectDb();
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors({
  origin: [
    "ai-resume-builder-66fo.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("server running successfully");
});
app.use('/api/v1/user', userRouter)
app.use('/api/v1/resumes', resumeRouter)
app.use('/api/v1/ai', aiRouter)


export default app;