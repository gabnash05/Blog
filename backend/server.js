import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import blogsRouter from './routes/blogs.js';
import usersRouter from './routes/user.js';

const app = express();
dotenv.config();

//environment variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


//middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

// Increase JSON payload limit to 1mb
app.use(express.json({ limit: '5mb' }));

// Increase form data payload limit to 1mb
app.use(express.urlencoded({ limit: '5mb', extended: true }));
  

//routes
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);


//connect to database
async function connect() {
  mongoose.connect(MONGO_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`connected to database and listening on port ${PORT}`));
    })
    .catch((error) => {
      console.log(error);
    })
}

connect();


