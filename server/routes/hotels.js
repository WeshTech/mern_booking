import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//creating hotels
router.post("/", verifyAdmin, createHotel);

//update hotels
router.put("/:id", verifyAdmin, updateHotel);

//delete hotels
router.delete("/:id",verifyAdmin, deleteHotel);

//get a single hotel
router.get("/find/:id",verifyUser, getHotel);

//get all hotels
router.get("/",verifyUser, getHotels);


export default router;