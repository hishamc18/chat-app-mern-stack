import jwt from 'jsonwebtoken'
import User from '../models/user.model'

export const protect = async (req, res, next) => {
    try {
        const token =  req.cookie.accessToken
        if(!token){
            res.status(401).json({message: "Unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            res.status(401).json({message: "Token is invalid"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            res.status(404).json({message: "User not found"})
        }
        req.user = user;
        next()

    } catch (error) {
        console.log("Error in authMiddleware", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}