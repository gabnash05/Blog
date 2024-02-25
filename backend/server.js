import express from 'express';
import dotenv from 'dotenv';

import blogsRouter from './routes/blogs.js';

const app = express();
dotenv.config();

//environment variables
const PORT = process.env.PORT;


//middleware
app.use(express.json());


//routes
app.use('/api/blogs', blogsRouter);


app.listen(PORT, () => console.log(`listening on port ${PORT}`));