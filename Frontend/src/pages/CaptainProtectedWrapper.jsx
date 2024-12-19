import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainProtectedWrapper = ({children}) => {
    const Token = localStorage.getItem("token")
    const {Captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading]= useState(true)
    const navigate = useNavigate()

    if(!Token){
        useEffect(()=>{
            navigate("/captain/login")
        },[])
    }

    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{headers:{Authorization:`bearer ${Token}`}})
      .then((response)=>{if(response.status === 200){setCaptain(response.data.Captain)
        setIsLoading(false)}})
      .catch((error)=>{console.log(error)
        navigate("/captain/login")
      })
    },[])
   


  if(isLoading){
    return (
      <div>Loading...</div>
    )
  }
  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper
