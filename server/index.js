import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/register.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import greetingsRoute from "./routes/greet.js";
import registrationRoute from "./routes/register.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 6000;
const connectionString = process.env.MONGODB_URL;

const connect = async () => {
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

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//express-session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: connectionString,
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
    },
  })
);

//middleware
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/greet", greetingsRoute);
app.use("/api/user", registrationRoute);

//error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello there,,, How are you doing!!");
});

app.listen(PORT, () => {
  connect();
  console.log(`The server is listening on port ${PORT}`);
});
