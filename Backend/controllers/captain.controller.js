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