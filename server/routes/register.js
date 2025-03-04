import express from "express";
import { validateRegistration } from "../utils/validator.js";
import { registration } from "../controllers/newUser.js";

const router = express.Router();

//new user using express-session mngt
router.post("/register", validateRegistration, registration);

export default router;