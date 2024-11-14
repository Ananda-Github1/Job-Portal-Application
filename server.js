// Package Imports
import express from 'express';
import "express-async-errors";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// File import
import connectDB from './config/db.js';
// Routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobRoutes from './routes/jobsRoutes.js';
import userRoutes from './routes/userRoutes.js';


// Dot ENV Config
dotenv.config();

// MongoDB Connection
connectDB();

// Rest object
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);


// Error Middleware (validaton)
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} on PORT no ${PORT}`);
});