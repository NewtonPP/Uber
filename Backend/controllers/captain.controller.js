import blacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import { CreateCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const RegisterCaptain = async (req,res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(200).json({errors:errors.array()})
    }

    const {FirstName, LastName} = req.body.FullName;
    const {Email, Password, Vehicle } = req.body

    const isCaptainAlreadyExist = await captainModel.findOne({Email})
    if(isCaptainAlreadyExist){
        return res.status(400).json({error:"This Captain already exists"})
    }

    const HashedPassword = await captainModel.hashPassword(Password)

    const Captain = await CreateCaptain({FirstName, LastName, Password:HashedPassword, Email, Color: Vehicle.Color,
        Plate: Vehicle.Plate, Capacity:Vehicle.Capacity, VehicleType:Vehicle.VehicleType
     })


     const Token = Captain.generateAuthToken();

     res.status(200).json({Token, Captain})

}


export const LoginCaptain = async (req,res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {Email, Password} = req.body;

    const Captain = await captainModel.findOne({Email}).select('+Password')

    if(!Captain){
        return res.status(401).json({message:"Invalid Email or Password"})
    }
    const isMatched = await Captain.comparePassword((Password))

    if (!isMatched){
        return res.status(401).json({message:"Invalid Email or Password"})
    }

    const Token = Captain.generateAuthToken();

    res.cookie("token", Token)
    res.status(200).json({Token, Captain})
}


export const GetCaptainProfile = async(req,res) =>{
    return res.status(200).json({Captain: req.Captain})
}



export const LogoutCaptain = async (req,res)=>{

    const Token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await blacklistTokenModel.create({Token})
    res.clearCookie("token")

    res.status(200).json({message:"Logout Successfully"})

}