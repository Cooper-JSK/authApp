import express from 'express';
import mongoose from 'mongoose'


mongoose.connect("mongodb+srv://janitha:janitha@mern.v49ujt9.mongodb.net/mern?retryWrites=true&w=majority&appName=mern")

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})