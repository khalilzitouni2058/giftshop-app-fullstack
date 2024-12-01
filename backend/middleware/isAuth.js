const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ msg: "Token expired" });
        } else {
            res.status(500).json({ msg: "Server error" });
        }
    }
};
module.exports = isAuth;