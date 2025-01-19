import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Token is invalid" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = user;
        next()

    } catch (error) {
        console.log("Error in authMiddleware", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}