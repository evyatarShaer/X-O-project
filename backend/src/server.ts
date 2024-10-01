import express from 'express';
import dotenv from 'dotenv';
import { Application } from 'express-serve-static-core';
import userRouter from './routes/userRouter';
import gameRouter from './routes/gameRouter';


dotenv.config();
const app: Application = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(gameRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});