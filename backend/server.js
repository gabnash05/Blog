import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import blogsRouter from './routes/blogs.js';

const app = express();
dotenv.config();

//environment variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


//middleware
app.use(express.json());


//routes
app.use('/api/blogs', blogsRouter);


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


