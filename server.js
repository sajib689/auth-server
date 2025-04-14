import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import usersRouter from './route/users.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI
app.use(cors({
    origin: ['https://auth-client-beryl.vercel.app']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const connectionDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
// routes

app.use('/api/v1/users', usersRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectionDb();
})