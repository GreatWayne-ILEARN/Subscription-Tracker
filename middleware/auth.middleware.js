import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";


const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if there is no token
        if (!token) return res.status(401).json({message: 'Unauthorized'});

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if user still exists -> from the db
        const user = await User.findById(decoded.userId);

        // If it does not exist
        if (!user) return res.status(401).json({message: 'Unauthorized'});

        // If it does exist, attach the user to the req that is being made
        req.user = user;

        next()
    }  catch (e) {
       res.status(401).json({message: 'Unauthorized Access',  error: e.message});
    }
}

// The Purpose Of the middleware is to find the user based of the token of the user that is trying to make the req it looks
export default authorize;