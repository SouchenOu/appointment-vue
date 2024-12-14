import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import appointementRoute from './Routes/Appointement.js';


const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'http://localhost:5173', 
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
};

app.use(cors(corsOptions));
app.use('/', appointementRoute);


app.use(express.json()); 

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
    console.log('Connected to backend and Socket.IO server listening on port 8000');
});