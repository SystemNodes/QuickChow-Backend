const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                message: "Access denied. No token provided" 
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Invalid token" });

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};

module.exports = authenticateJWT;
