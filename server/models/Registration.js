import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        uniquie: true,
        trim: true,
    },
    password: {
        type: String,
        requiered: true,
        minLength: 8
    }
});

const NewUser = mongoose.model("NewUser", RegistrationSchema );

export default NewUser;