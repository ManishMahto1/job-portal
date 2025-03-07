import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/error.js';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import bodyParser from "body-parser";
import cors from 'cors';
const app = express();

connectDB();

// Body Parser Middleware
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
  }));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));