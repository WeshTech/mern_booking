import express from "express";
import { validateLogin, validateRegistration } from "../utils/validator.js";
import { loginUser, registration } from "../controllers/newUser.js";
import { checkAnotherDevice } from "../utils/checkAuthentication.js";

const router = express.Router();

//new user using mngt
router.post("/register", validateRegistration, registration);

//login process
router.post("/login", validateLogin, checkAnotherDevice, loginUser);

export default router;