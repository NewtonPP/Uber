import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] =useState("")
    const [Password, setPassword] = useState("")
    const [VehicleColor, setVehicleColor] = useState("")
    const [VehiclePlate, setVehiclePlate] = useState("")
    const [VehicleCapacity, setVehicleCapacity] = useState("")
    const [VehicleType, setVehicleType] = useState("")

    const {Captain, setCaptain} = useContext(CaptainDataContext)
    const navigate = useNavigate();
const HandleSubmit = (e)=>{
    e.preventDefault()
   const newCaptain = {
      FullName:{
        FirstName:FirstName,
        LastName:LastName,
      },
        Email:Email,
        Password:Password,
        Vehicle:{
        Color:VehicleColor,
        Plate:VehiclePlate,
        VehicleType:VehicleType,
        Capacity:VehicleCapacity
        }
    }
  
    axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain)
    .then((response)=>{
      if(response.status === 200){

        const data = response.data
        setCaptain(data.Captain)
        localStorage.setItem("token", data.Token)
        navigate("/captainhome")
      }
    })
    .catch((error)=>console.log(error))

    setEmail("")
    setPassword("")
    setFirstName(""),
    setLastName("")
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleType("")
    setVehicleCapacity("")

}
  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
       <div>
       <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
    <form onSubmit={HandleSubmit}>

    <h3 className='text-base font-medium mb-2'>What's your Name?</h3>
        <div className='flex gap-4 mb-5'>
        <input
        className='bg-[#eeeeee]  rounded py-2 px-4 border w-1/2 text-lg placeholder:text-base' 
        value={FirstName}
        onChange={(e)=>setFirstName(e.target.value)}
        required type='text' placeholder='First Name'/>

<input 
      className='bg-[#eeeeee]  rounded py-2 px-4 border w-1/2 text-lg placeholder:text-base' 
      value={LastName}
      onChange={(e)=>setLastName(e.target.value)}
      required type='text' placeholder='Last Name'/>
        </div>

      <h3 className='text-base font-medium mb-2'>What's your email?</h3>
      <input 
      value={Email}
      onChange={(e)=>setEmail(e.target.value)}
      className='bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='email' placeholder='someone@gmail.com'/>

      <h3  className='text-base font-medium mb-2'> Enter Passsword</h3>
      <input 
      value={Password}
      onChange={(e)=>setPassword(e.target.value)}
      className='bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='password' placeholder='password'></input>

<h3  className='text-base font-medium mb-2'> What is your vehicle Plate number?</h3>
      <input 
      value={VehiclePlate}
      onChange={(e)=>setVehiclePlate(e.target.value)}
      className='bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='text' placeholder='Vehicle Plate'></input>

<h3  className='text-base font-medium mb-2'> What is your vehicle type?</h3>
    <select value={VehicleType} 
    onChange={(e)=>setVehicleType(e.target.value)}
    className='bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required>
      <option value={""}>select an option</option>
      <option value={"car"}>car</option>
      <option value={"motorcycle"}>motorcycle</option>
      <option className='auto'>auto</option>
    </select>      

<h3  className='text-base font-medium mb-2'> What is your vehicle color?</h3>
      <input 
      value={VehicleColor}
      onChange={(e)=>setVehicleColor(e.target.value)}
      className='bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='text' placeholder='Vehicle Color'></input>

<h3  className='text-base font-medium mb-2'> What is your vehicle capacity?</h3>
      <input 
      value={VehicleCapacity}
      onChange={(e)=>setVehicleCapacity(e.target.value)}
      className='bg-[#eeeeee] mb-5 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='text' placeholder='Vehicle Capacity'></input>

      <button
       className='bg-[#111] text-white mb-5 rounded py-2 px-4 w-full text-lg placeholder:text-base'>
        Signup
      </button>
    </form>

    <p>Already have an account? <Link to={"/captain/login"} className='text-blue-500'>Login here</Link></p>
       </div>

        <div>

        <Link to={"/user/signup"}>
        <button
       className='bg-[#111] text-white mb-7 rounded py-2 px-4 w-full text-lg placeholder:text-base'>
        Sign up as a user
      </button>
      </Link>
        </div>

    </div>
  )
}

export default CaptainSignup
