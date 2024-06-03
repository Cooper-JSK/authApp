import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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





