import { app } from "./app.js";
import http from "http"
import { InitializeSocket } from "./socket.js";


const server = http.createServer(app)

const PORT = process.env.PORT || 3000;

InitializeSocket(server);

server.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})