import axios from "axios"
import captainModel from "../models/captain.model.js"

export const GetAddressCoordinate = async (address) =>{
    const ApiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${ApiKey}`
    try {
        const response = await axios.get(url)
        // console.log(response)
        if(response.data.status === "OK"){
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error ("Unable to fetch coordinates")
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const GetDistanceAndTime  = async (origin, destination) =>{
    if(!origin || !destination){
        throw new Error ("Origin and Destination are required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&units=imperial&key=${apiKey}`

    try {
        const response = await axios.get(url)
            if(response.data.status === "OK"){
                if (response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
                    throw new Error ("No routes found")
                }   
                return response.data.rows[0].elements[0]
            }
            else {
                throw new Error ("Unable to fetch distance and time")
            } 
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const GetSuggestions = async (input) =>{
    if(!input){
        throw new Error ("Query is Required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${apiKey}`

    try {
        const response = await axios.get(url)
        if(response.data.status === "OK"){
            return response.data.predictions
        }
        else{
            throw new Error ("Unable to fetch suggestions")
        }
    } catch (error) {
        console.error
        throw error
    }   
  
}


export const GetCaptainsInRadius = async (ltd, lng, radius) =>{
    const captains = await captainModel.find({
        Location:{
            $geoWithin:{
                $centerSphere:[[ltd, lng], radius / 3963.2]
            }
        }
    })

    return captains
}


