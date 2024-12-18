import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()

const HandleSubmit = (e)=>{
    e.preventDefault()
    const UserData={
        Email:Email,
        Password:Password
    }

    axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, UserData)
    .then((response)=>{
        if(response.status === 200){
          const data = response.data;
          setUser(data.user)
          localStorage.setItem("token", data.Token)
          navigate("/home")
        }
    })
    .catch((error)=>console.log(error))
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

    <p>New User? <Link to={"/user/signup"} className='text-blue-500'>Create a new account</Link></p>
       </div>

        <div>

        <Link to={"/captain/login"}>
        <button
       className='bg-[#111] text-white mb-7 rounded py-2 px-4 w-full text-lg placeholder:text-base'>
        Sign in as a captain
      </button>
      </Link>
        </div>

    </div>
  )
}

export default UserLogin
