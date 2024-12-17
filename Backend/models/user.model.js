import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    FullName:{
        FirstName:{
            type:String,
            required:true,
            minlength :[3, 'First name must be atleast 3 characters long']
        },
        LastName:{
            type:String,
            required:true,
            minlength :[3, 'Last name must be atleast 3 characters long']
        }
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        minlength :[5, 'Email must be atleast 3 characters long']
    },
    Password:{
        type:String,
        required:true,
        select:false
    },
    SocketID:{
        type:String
    }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id}, process.env.JWT_Secret, {expiresIn:"24h"})
    return token
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.Password)
}

userSchema.statics.hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10)
}

export const UserModel = mongoose.model("User", userSchema)