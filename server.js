import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './route/todoRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

connectDB();

app.use("/", authRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
