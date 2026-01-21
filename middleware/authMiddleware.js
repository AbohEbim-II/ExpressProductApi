import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded.userId
            next()
            return
        } catch(error) {
           return res.status(401).json('Not authorized, Invalid token')
        }
    }

    if(!token) {
        res.status(401).json('Not authorized, No token')
    }
})

export { protect };