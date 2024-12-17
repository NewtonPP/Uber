import mongoose from "mongoose";


const BlackListTokenSchema = new mongoose.Schema({
    Token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 86400
    }
})


export default mongoose.model("BlackListToken", BlackListTokenSchema)