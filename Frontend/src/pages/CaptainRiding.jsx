import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from "axios"
import { useLocation } from 'react-router-dom'

const CaptainRiding = () => {
  const {Captain} = useContext(CaptainDataContext)
  const location =useLocation()
  const rideData = location.state?.ride

    const [FinishRidePanel, setFinishRidePanel] = useState(false)
    const FinishRidePanelRef = useRef(null)

    useGSAP(function(){
        if(FinishRidePanel){
        gsap.to(FinishRidePanelRef.current,{
          transform: 'translateY(0)'
        })
      }
      else{
        gsap.to(FinishRidePanelRef.current,{
          transform: 'translateY(100%)'
        })
      }
      },[FinishRidePanel])

  return (
    <div className='h-screen'>
        <div className='fixed p-2 top-0'>
        <img className="h-8" src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <Link to={"/"} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-xl'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

      <div className=' h-4/5 w-screen'>
        <img className="h-full object-cover object-fit"src='https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg'></img>
      </div>

      <div className='h-1/5 bg-yellow-400 flex flex-col  items-center' onClick={(()=>setFinishRidePanel(true))}>
      <i className='text-3xl font-medium ri-arrow-up-wide-line'></i>
        <h4 className='text-xl font-bold flex justify-center items-center gap-2'> 
            <i className='text-3xl font-medium ri-route-fill'></i>
             You are just 4 miles away</h4>
  
            
            <button className='mt-5 w-full bg-black text-white font-semiboldr rounded-lg p-2'>Finish Ride</button>
      </div>

      <div ref={FinishRidePanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-4 flex flex-col gap-2 pt-12'>
        <FinishRide 
        rideData = {rideData}
        setFinishRidePanel = {setFinishRidePanel} />
      </div>

    </div>
  )
}

export default CaptainRiding
