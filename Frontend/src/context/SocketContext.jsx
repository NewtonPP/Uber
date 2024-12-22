import { createContext, useEffect } from "react"
import {io} from "socket.io-client"

export const SocketDataContext = createContext();

const socket = io (`${import.meta.env.VITE_BASE_URL}`)
const SocketContext = ({children}) => {
    useEffect(() =>{
        socket.on('connect', () =>{
            console.log("Connected to server")
        })
        socket.on('disconnect', () =>{
            console.log("Disconnected from server")
        })

    },[])


    const SendMessage = (eventName, message) =>{
        socket.emit(eventName, message)
    }
    const Receive = (eventName, callback) =>{
        socket.on(eventName, callback)
    }
  return (
  <SocketDataContext.Provider value={{socket, SendMessage, Receive}}>{children}</SocketDataContext.Provider>
  )
}

export default SocketContext
