import NewUser from "../models/Registration.js";
import bcrypt from "bcryptjs";

export const registration = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await NewUser.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email is already taken" });

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const newUser = NewUser({ username, email, password: hashedPassword });
        await newUser.save();

        //remove the password in the return data


        res.status(201).json({message: "User registered Successfully"});
    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}