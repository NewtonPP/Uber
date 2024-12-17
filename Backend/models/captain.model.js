import mongoose from "mongoose"
import { type } from "os"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const CaptainSchema = new mongoose.Schema({
    FullName:{
        FirstName:{
            type:String,
            required:true,
            minlength :[3, 'First name must be atleast 3 characters long']
        },
        LastName:{
            type:String,
            minlength :[3, 'Last name must be atleast 3 characters long']
        }
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength :[5, 'Email must be atleast 3 characters long']
    },
    Password:{
        type:String,
        required:true,
        select:false
    },
    SocketID:{
        type:String
    },
    Status:{
        type:String,
        enum:['active', 'inactive'],
        default:'inactive'
    },
    Vehicle:{
        Color:{
            type:String,
            required:true,
            minlength:[3, "Color must be atleast 3 characters long"]
        },
        Plate:{
            type:String,
            required:true,
            minlength:[3, "Plate must be atleast 3 characters long"]
        },
        Capacity:{
            type:Number,
            required:true,
            min:[1, "Capacity must be atleast 1"],
        },
        VehicleType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"]
        }
    },
    Location:{
        Latitude:{
            type:Number,
        },
        Longitude:{
            type:Number
        }
    }
})

CaptainSchema.methods.generateAuthToken = function () {
    const Token = jwt.sign({_id:this.id}, process.env.JWT_Secret,{expiresIn:'24h'})
    return Token
}


CaptainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.Password)
}

CaptainSchema.statics.hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10)
}


export default mongoose.model("Captain",CaptainSchema)