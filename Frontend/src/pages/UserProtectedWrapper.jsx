import { UserDataContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios"

const UserProtectedWrapper = ({children}) => {
    const Token = localStorage.getItem("token")
    const {User, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()

  
        useEffect(()=>{
          if(!Token){
            navigate("/user/login")
          }
          
          axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{headers:{Authorization:`Bearer ${Token}`}})
          .then((response)=>{
            if(response.status === 200){
              setUser(response.data)
            }
          })
          .catch(error =>{
            console.log(error)
            localStorage.removeItem("token")
            Navigate("/users/login")
          })
        },[Token])

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
