import captainModel from "../models/captain.model.js";

export const CreateCaptain = async({FirstName, LastName, Email, Password, Color, Plate, Capacity, VehicleType})=>{
    if(!FirstName || !Email || !Password || !Color || !Plate || !Capacity || !VehicleType){
        throw new Error("All fields are required")
    }

    const Captain = await captainModel.create({FullName:{FirstName, LastName}, Email, Password,
    Vehicle:{Color, Plate, Capacity,
        VehicleType}})


    return Captain
}