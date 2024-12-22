import { GetAddressCoordinate, GetCaptainsInRadius } from "../services/maps.service.js";
import { ConfirmUserRide, CreateRide, GetFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { SendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

export const CreateUserRide = async (req,res) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const { pickup, destination, VehicleType} = req.body;

        try{
            const ride = await CreateRide({user:req.user._id, pickup, destination, VehicleType})
             res.status(201).json(ride)
            const PickupCoordinates = await GetAddressCoordinate(pickup)
            const CaptainsInRadius = await GetCaptainsInRadius(PickupCoordinates.ltd, PickupCoordinates.lng, 4)

            const RideWithUser = await rideModel.findOne({_id: ride._id}).populate('user')
          CaptainsInRadius.map(async Captain =>{
                SendMessageToSocketId(Captain.SocketID, {
                    event:"NewRide",
                    data: RideWithUser
                })
            })
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


export const ConfirmRide = async (req,res) =>{
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await ConfirmUserRide(rideId, req.Captain._id)

        SendMessageToSocketId(ride.user.SocketID,{
            event:"RideConfirmed",
            data:ride
        } )
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}