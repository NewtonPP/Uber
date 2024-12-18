import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const CaptainSignup = () => {
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] =useState("")
    const [Password, setPassword] = useState("")

const HandleSubmit = (e)=>{
    e.preventDefault()
   const newCaptain = {
      FullName:{
        FirstName:FirstName,
        LastName:LastName,
      },
        Email:Email,
        Password:Password
    }

    axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain)
    .then((response)=>console.log(response))

    setEmail("")
    setPassword("")
    setFirstName(""),
    setLastName("")

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
