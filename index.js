import express from 'express';
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // or '*', for all
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));

app.get('/', (req, res)=>{
    return res.status(234).send("Welcome");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

  