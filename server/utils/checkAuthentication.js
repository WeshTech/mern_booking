import jwt from "jsonwebtoken";
import NewUser from "../models/Registration.js";

export const checkAuthStatus = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json({ message: "You are not authenticated!" });

        //decode the session
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !req.session.userId) {
            return res.status(401).json({ message: "Your session has issues!!" });
        }
        next();
    } catch(err) {
        return res.status(403).json({ message: "Something went wrong!!" });
    }
};


export const checkAnotherDevice = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required!" });

        // Find the user by email to get their user ID
        const user = await NewUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const userId = user._id.toString();

        // Access sessionStore
        const sessionStore = req.sessionStore;
        if (!sessionStore) {
            return res.status(500).json({ message: "Something went wrong" });
        }

        // Use sessionStore.all() to retrieve all sessions
        sessionStore.all(async (err, sessions) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }

            // Filter sessions for the current user
            const userSessions = Object.values(sessions || {}).filter(
                (session) => session.userId === userId
            );

            // If a session exists for the user, block login
            if (userSessions.length > 0) {
                return res.status(403).json({
                    message: "You are already logged in on another device. Please log out or contact IT support.",
                });
            }

            next(); // Proceed to login if no active session exists
        });

    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
