import express from "express";

const router = express.Router();

//creating hotels
router.post("/", async (req, res) => {
    try {

    } catch(err) {
        res.status(500).json(err);
    }
})

export default router;