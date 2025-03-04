import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const name = req.query.name;
    console.log(`received the name ${name}`);

    res.status(200).send(`Hello ${name}`);
});

export default router;