import NewUser from "../models/Registration.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const registration = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await NewUser.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email is already taken" });

        //normalize the email
        const normalizedEmail = email.toLowerCase();

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const newUser = NewUser({ username, email: normalizedEmail, password: hashedPassword });
        await newUser.save();

        //remove the password in the return data


        res.status(201).json({message: "User registered Successfully"});
    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};


export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        //find the user by email
        const user = await NewUser.findOne({ email });
        if (!user) {
            return res.status(401).json({ message:"Invalid credentials" });
        }

        //compare the passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        

        //store userid in the session
        req.session.userId = user._id;

        //generate a jwt for the sessionID
        const token = jwt.sign(
            { sessionID: req.sessionID, userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        //send the jwt as a cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "Strict"
        });

        res.status(200).json({ message: "Login successful", token, user: { username: user.username, email: user.email } })
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong!" });
    }
};