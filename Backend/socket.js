import {Server} from "socket.io"
import { UserModel } from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import cors from "cors"
import { createServer } from "http";
let io;
export const InitializeSocket = (server) => {
    io = new Server(server,{ cors: {
        origin: ["http://localhost:5173","https://6wml48gm-5173.use2.devtunnels.ms"],
        methods: ["GET", "POST"]
      }})
    io.on("connection", (socket) => {    
        socket.on("join", async (data) => {
            console.log("An user joined", data.userType)
            const { userId, userType } = data;
            if (userType === "user") {
                await UserModel.findByIdAndUpdate(userId, { SocketID: socket.id });
            } else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { SocketID: socket.id });
            }
        });
        
        socket.on("UpdateLocationCaptain", async (data) =>{
            const {userId, userType, ltd, lng} = data
            
            if (!ltd || !lng){
                return socket.emit("error",{message:"Invalid Location"})
            }
            await captainModel.findByIdAndUpdate(userId, {Location:{
                ltd,
                lng
            }})
        })
        socket.on("disconnect", () => {
            console.log("Client Disconnected", socket.id);
        });
    });
    
}

export const SendMessageToSocketId = (SocketId, message) =>{
    if (io){
        io.to(SocketId).emit(message.event, message.data)
    }
    else{
        console.log("Socket.io not initialized")
    }
}