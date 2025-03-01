import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGODB_URL;

const connect = async() => {
try {
    await mongoose.connect(connectionString);
    console.log("Connected to the Database");
} catch (error) {
    throw error;
}


mongoose.connection.on("disconnected", () => {
    console.log("DB connection Terminated");
});
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

app.use(express.json());

//middleware
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);


app.listen(PORT, () => {
    connect();
    console.log(`The server is listening on port ${PORT}`);
})