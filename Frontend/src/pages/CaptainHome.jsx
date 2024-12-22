import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap';
import ConfirmedRidePopup from '../components/ConfirmedRidePopup'

const CaptainHome = () => {

  const [RidePopUpPanel, setRidePopUpPanel] = useState(true)
  const [ConfirmedRidePopUpPanel,setConfirmedRidePopUpPanel ] = useState(false)
  const RidePopUpPanelRef = useRef(null)
  const ConfirmedRidePopUpPanelRef = useRef(null)

  useGSAP(function(){
    if(RidePopUpPanel){
    gsap.to(RidePopUpPanelRef.current,{
      transform: 'translateY(0)'
    })
  }
  else{
    gsap.to(RidePopUpPanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
  },[RidePopUpPanel])

  useGSAP(function(){
    if(ConfirmedRidePopUpPanel){
    gsap.to(ConfirmedRidePopUpPanelRef.current,{
      transform: 'translateY(0)'
    })
  }
  else{
    gsap.to(ConfirmedRidePopUpPanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
  },[ConfirmedRidePopUpPanel])
  return (
    <div className='h-screen'>
      <div className='fixed p-2 top-0'>
        <img className="h-8" src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <Link to={"/"} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-xl'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

      <div className=' h-[60%] w-screen'>
        <img className="h-full object-cover object-fit"src='https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg'></img>
      </div>
      <div className='h-2/5 p-6'><CaptainDetails/></div>

    <div ref={RidePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 flex flex-col gap-2 pt-12'>
        <RidePopUp setRidePopUpPanel = {setRidePopUpPanel} setConfirmedRidePopUpPanel = {setConfirmedRidePopUpPanel}/>
      </div>

      <div ref={ConfirmedRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-4 flex flex-col gap-2 pt-12'>
        <ConfirmedRidePopup setConfirmedRidePopUpPanel = {setConfirmedRidePopUpPanel} setRidePopUpPanel = {setRidePopUpPanel}/>
      </div>
</div>
  )
}

export default CaptainHome
