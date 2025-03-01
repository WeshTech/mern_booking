import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

mongoose.connection.on("disconnected", () => {
    console.log("DB connection Terminated");
});


app.get('/', (req, res) => {
    res.status(200).send("Fuck you");
})


app.listen(PORT, () => {
    connect();
    console.log(`The server is listening on port ${PORT}`);
})