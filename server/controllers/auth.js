import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//register
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const newUser = new User({
          ...req.body,
          password: hash,
        });
    
        await newUser.save();
        res.status(200).send("User has been created.");
      } catch (err) {
        next(err);
      }
};


//login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username});
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(401, "Wrong Credentials"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, jwtSecret, { expiresIn: "1h" });

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {httpOnly: true} ).status(200).json({...otherDetails});
      } catch (err) {
        next(err);
      }
};


