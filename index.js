import express from 'express';
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL, // or '*', for all
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));

app.get('/', (req, res)=>{
    return res.status(234).send("Welcome");
});

app.use('/books', booksRoute);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('app connected to database');
    app.listen(process.env.PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

  