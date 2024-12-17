import { UserModel } from "../models/user.model.js";
import { CreateUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const RegisterUser = async (req,res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {Password, Email} = req.body
    const {FirstName, LastName} = req.body.FullName

    const isUserAlreadyExists = await UserModel.findOne({Email})
    if (isUserAlreadyExists){
        return res.status(400).json({error:"This user already exists"})
    }

    const HashedPassword = await UserModel.hashPassword(Password)

    const user = await CreateUser({FirstName, LastName, Email, Password:HashedPassword})

    const Token = user.generateAuthToken(); 
    res.status(201).json({Token, user});
}

export const LoginUser = async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {Email, Password} = req.body
    const user = await UserModel.findOne({Email}).select("+Password")

    if(!user){
        return res.status(401).json({message: "Invalid Email of Password"})
    }

    const isMatch =  await user.comparePassword(Password)
    
    if (!isMatch){
        return res.status(401).json({message:'Invalid Email or Password'})
    }

    const Token = user.generateAuthToken()

    res.cookie('token', Token)
    res.status(200).json({Token, user})

}



export const GetUserProfile = async (req, res) =>{
    res.status(200).json(req.user)
}

export const LogoutUser = async (req,res) =>{
    res.clearCookie('token')
    const Token = req.cookies.token || req.headers.authorizations?.split(' ')[1]

    await blacklistTokenModel.create({Token})
    res.status(200).json({message:"Logged Out"})
}