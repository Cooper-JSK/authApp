import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'


dotenv.config();


const app = express();
app.use(express.json())

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





