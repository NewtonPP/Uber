import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const AuthUser = async (req,res, next) =>{
    const Token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!Token){
        return res.status(401).json({message :"Unauthorized"})
    }

    const isBlacklisted = await UserModel.findOne({Token})

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decoded = jwt.verify(Token, process.env.JWT_Secret)
        const user = await UserModel.findById(decoded._id)

        req.user = user

        return next();
    } catch (error) {   
        return res.status(401).json({message:"Unauthorized"})
    }
} 