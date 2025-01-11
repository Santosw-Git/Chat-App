import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(403).json({ error: "Unauthorized request - No Token Provided" });
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
        
        const user = await User.findOne({_id:decodedToken.user_Id}).select("-password")
        req.user = user;
        next();


    } catch (error) {
        console.error("JWT Error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token has expired" });
        }
        return res.status(401).json({ error: "Invalid Token" });
    }
};

export { protectRoute };
