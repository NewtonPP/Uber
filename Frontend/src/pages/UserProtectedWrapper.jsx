import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useEffect } from "react";


const UserProtectedWrapper = ({children}) => {
    const Token = localStorage.getItem("token")
    const {user} = useContext(UserDataContext)
    const navigate = useNavigate()

    if(!Token){

        useEffect(()=>{
            navigate("/user/login")
        },[])
       
    }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
