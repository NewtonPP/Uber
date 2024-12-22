import rideModel from "../models/ride.model.js";
import { GetDistanceAndTime } from "./maps.service.js";

export const GetFare = async (pickup, destination) =>{
    if(!pickup || !destination){
        throw new Error ("Pickup and destination are required")
    }

    const DistanceAndTime = await GetDistanceAndTime(pickup, destination);

    const BaseFare = {
        car: 20,
        motorcycle:10
    }

    const PerMileRate ={
        car: 4, 
        motorcycle: 2
    }
    const PerMinute ={
        car: 0.4,
        motorcycle :0.2
    }
    const Fare = {
        car: Math.round(BaseFare.car + ((DistanceAndTime.distance.value/1000 )* PerMileRate.car) + (DistanceAndTime.duration.value * PerMinute.car)),
        motorcycle: Math.round(BaseFare.motorcycle + ((DistanceAndTime.distance.value/1000 )* PerMileRate.motorcycle) + (DistanceAndTime.duration.value * PerMinute.motorcycle))
    }

    return Fare
}

export const CreateRide = async ({user, pickup, destination, VehicleType}) =>{
    if (!user || !pickup || !destination || !VehicleType){
        throw new Error("All fields are required")
    }

    const Fare = await GetFare(pickup, destination)
    const Ride = rideModel.create ({
        user, pickup, destination, fare:Fare[VehicleType]
    })

    return Ride
}

export const ConfirmUserRide = async (rideId, CaptainID) =>{
    if (!rideId){
        throw new Error ("Ride ID is required")
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:"acceped",
        captain:CaptainID
    })
    const ride = await rideModel.findOne({
        _id: rideId,
    }).populate("user").populate("captain")

    if(!ride){
        throw new Error ("Ride not found")
    }

    return ride
}