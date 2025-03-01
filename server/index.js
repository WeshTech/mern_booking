import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";

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

app.use(cookieParser());
app.use(express.json());

//middleware
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);


//error handler middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(PORT, () => {
    connect();
    console.log(`The server is listening on port ${PORT}`);
})