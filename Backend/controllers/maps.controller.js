import { validationResult } from "express-validator";
import { GetAddressCoordinate, GetDistanceAndTime, GetSuggestions } from "../services/maps.service.js";

export const GetCoordinates =async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return resizeBy.status(400).json({errors:errors.array()})
    }

    const {address} = req.query 

    try {
        const coordinates = await GetAddressCoordinate(address)
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({message:"Coordinates not found"})
    }
}


export const GetDistanceTime = async (req,res)=>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {origin, destination} = req.query;
        const distanceTime = await GetDistanceAndTime(origin, destination)

        res.status(200).json(distanceTime)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const GetAutoCompleteSuggestions = async (req,res) =>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {input} = req.query
        const suggestions = await GetSuggestions(input)
        res.status(200).json(suggestions)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
} 