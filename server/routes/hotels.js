import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";

const router = express.Router();

//creating hotels
router.post("/", createHotel);

//update hotels
router.put("/:id", updateHotel);

//delete hotels
router.delete("/:id", deleteHotel);

//get a single hotel
router.get("/find/:id", getHotel);

//get all hotels
router.get("/", getHotels);


export default router;