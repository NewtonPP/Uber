import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div>
        <div className='bg-cover bg-bottom bg-[url(https://cdn.jdpower.com/Who%20Invented%20The%20Traffic%20Light.jpg)] h-screen pt-5 flex justify-between flex-col  w-full'>
            <img className='w-16 ml-8' src='https://www.texasrealsanta.com/wp-content/uploads/2024/10/uber-logo-white.png'></img>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to={"/user/login"}className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
