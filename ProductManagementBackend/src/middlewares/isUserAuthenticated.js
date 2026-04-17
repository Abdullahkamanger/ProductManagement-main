import jwt from "jsonwebtoken";
import User from "../modals/user.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // 1. Ensure req.cookies exists  -- requires cookie-parser
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        // 2. Verify token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find user
        req.user = await User.findById(decodedData.id);
        
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        next(); 
    } catch (error) {
    return res.status(401).json({ 
        message: "Invalid or expired token",
    });
}
};