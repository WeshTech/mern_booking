import express from "express";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel, countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//creating hotels
router.post("/", verifyAdmin, createHotel);

//update hotels
router.put("/:id", verifyAdmin, updateHotel);

//delete hotels
router.delete("/:id",verifyAdmin, deleteHotel);

//get a single hotel
router.get("/find/:id", getHotel);

//get all hotels
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;