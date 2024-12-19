import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import blacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";


export const AuthUser = async (req,res, next) =>{
    const Token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!Token){
        return res.status(401).json({message :"Unauthorized"})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({Token})

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

export const AuthCaptain = async (req,res, next) =>{
    const Token = req.cookies.token || req.headers.authorization.split(' ')[1]
 
    if(!Token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({Token})

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const Decoded = jwt.decode(Token, process.env.JWT_Secret)
        const Captain = await captainModel.findById(Decoded._id)
        req.Captain = Captain

        return next();
    } catch (error) {
        res.status(401).error("Unauthorized")
    }
}

