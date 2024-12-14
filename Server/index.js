import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";


const app = express();
dotenv.config();


const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
    } catch (error) {
    console.error('Error connecting to MongoDB', error);
    }
};




app.listen(8000, () => {
connect();
console.log(
'Connected to backend and Socket.IO server listening on port 8000'
);
});


