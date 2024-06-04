import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'


dotenv.config();


const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log('MongoDB connected successfully');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle MongoDB duplicate key error
    if (err.code && err.code === 11000) {
        statusCode = 400;
        message = "Username or email already exists";
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    }

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});


