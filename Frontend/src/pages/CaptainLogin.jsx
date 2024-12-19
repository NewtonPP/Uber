import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const navigate = useNavigate("")

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const {Captain, setCaptain} = useContext(CaptainDataContext)

const HandleSubmit = (e)=>{
    e.preventDefault()
    const CaptainData = {
        Email:Email,
        Password:Password
    }

    axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, CaptainData)
    .then((response)=>{
      if (response.status === 200){
        const data = response.data
        setCaptain(data.Captain)
        localStorage.setItem("token", data.Token)
        navigate("/captainhome")
      }
    })

    
    setEmail('')
    setPassword('')

}
  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
       <div>
       <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
    <form onSubmit={HandleSubmit}>
      <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
      <input 
      value={Email}
      onChange={(e)=>setEmail(e.target.value)}
      className='bg-[#eeeeee] mb-7 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='email' placeholder='someone@gmail.com'/>

      <h3  className='text-lg font-medium mb-2'> Enter Passsword</h3>
      <input 
      value={Password}
      onChange={(e)=>setPassword(e.target.value)}
      className='bg-[#eeeeee] mb-7 rounded py-2 px-4 border w-full text-lg placeholder:text-base' required type='password' placeholder='password'></input>

      <button
       className='bg-[#111] text-white mb-7 rounded py-2 px-4 w-full text-lg placeholder:text-base'>
        Login
      </button>
    </form>

    <p>New Captain? <Link to={"/captain/signup"} className='text-blue-500'>Create a new account</Link></p>
       </div>

        <div>

        <Link to={"/user/login"}>
        <button
       className='bg-[#111] text-white mb-7 rounded py-2 px-4 w-full text-lg placeholder:text-base'>
        Sign in as a user
      </button>
      </Link>
        </div>

    </div>
  )
}

export default CaptainLogin
