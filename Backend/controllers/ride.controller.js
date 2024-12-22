import { CreateRide, GetFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const CreateUserRide = async (req,res) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const { pickup, destination, VehicleType} = req.body;

        try{
            const ride = await CreateRide({user:req.user._id, pickup, destination, VehicleType})
            return res.status(201).json(ride)
        }       
        catch(err){
            return res.status(500).json({message:err.message})
        }
}


export const GetRideFare = async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {pickup, destination} = req.query

    try {
        const fare = await GetFare(pickup, destination)
        return res.status(200).json(fare)
    } catch (error) {   
        return res.status(500).json({message: error.message})
    }
}