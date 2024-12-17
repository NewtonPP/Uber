import mongoose from "mongoose"

export const ConnectToDb = () =>{
    try {
        mongoose.connect(process.env.DB_CONNECT,
         console.log("Successful Connection with the database"))
    } catch (error) {
        console.log("Error in the database connection", error)
    }
}