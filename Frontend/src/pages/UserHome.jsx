import React, { useRef, useState } from 'react'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import WaitForDriver from '../components/WaitForDriver';
import LookingForDriver from '../components/LookingForDriver';

const UserHome = () => {
  const [PickupLocation, setPickupLocation] = useState('');
  const [Destination, setDestination] = useState('')
  const [PanelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [isVehiclePanelOpen, setisVehiclePanelOpen] = useState(false)
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriver, setWaitingForDriver] = useState(false);
  const ConfirmedRidePanelRef = useRef(null)
  const VehiclePanelRef = useRef(null)
  const VehicleFoundRef = useRef(null)
  const WaitingForDriverRef = useRef(null)

  const HandleSubmit = (e) =>{
    e.preventDefault();
  }
  
  useGSAP(function () {
    if(PanelOpen){
    gsap.to(panelRef.current, {
      height:'70%'
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
  }
  else{
    gsap.to(panelRef.current,{
      height:'0%'
    })
     gsap.to(panelCloseRef.current,{
      opacity:0
    })
  }
  },[PanelOpen])

  useGSAP(function(){
    if(isVehiclePanelOpen){
    gsap.to(VehiclePanelRef.current,{
      transform: 'translateY(0)'
    })
  }
  else{
    gsap.to(VehiclePanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
  },[isVehiclePanelOpen])

  useGSAP(function(){
    if(ConfirmedRidePanel){
    gsap.to(ConfirmedRidePanelRef.current,{
      transform: 'translateY(0)'
    })
  }
  else{
    gsap.to(ConfirmedRidePanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
  },[ConfirmedRidePanel])


  useGSAP(function(){
    if(VehicleFound){
    gsap.to(VehicleFoundRef.current,{
      transform: 'translateY(0)'
    })
  }
  else{
    gsap.to(VehicleFoundRef.current,{
      transform: 'translateY(100%)'
    })
  }
  },[VehicleFound])

  useGSAP(function(){
    if(WaitingForDriver){
    gsap.to(WaitingForDriverRef.current,{
      transform: 'translateY(0)'
    })
  }
  else{
    gsap.to(WaitingForDriverRef.current,{
      transform: 'translateY(100%)'
    })
  }
  },[WaitingForDriver])



  return (
    <div className='h-screen overflow-hidden relative '>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>

      <div className=' h-screen w-screen'>
        <img className="h-full object-cover object-fit"src='https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg'></img>
      </div>

      <div className=' h-screen absolute bottom-0 w-full flex flex-col justify-end'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 
          ref={panelCloseRef}
          onClick={()=>setPanelOpen(false)}
          
          className={'absolute top-1 left-4 text-xl'}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
        <h4 className='text-2xl font-semibold py-2'> Find a trip</h4>
        <form onSubmit={(e)=>HandleSubmit}>
          <div className='Line absolute h-20 w-1 bg-black top-[32%] left-10 rounded-full'></div>
          <input 
          onClick={()=>setPanelOpen(true)}
          onChange={(e)=>{setPickupLocation(e.target.value)}}
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
          type='text' placeholder='Add a pick-up location'></input>


          <input type='text' 
           onClick={()=>setPanelOpen(true)}
           onChange={(e)=>{setDestination(e.target.value)}}
           className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
           placeholder='Enter your destination'></input>
        </form>
        </div>

        <div ref={panelRef} className='h-0 bg-white'>
            <LocationSearchPanel setPanelOpen = {setPanelOpen} VehiclePanel={isVehiclePanelOpen} setVehiclePanel = {setisVehiclePanelOpen}/>
        </div>

      </div>

      <div ref={VehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 flex flex-col gap-2 pt-12'>
        <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setisVehiclePanelOpen = {setisVehiclePanelOpen}/>
      </div>

      <div ref={ConfirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 flex flex-col gap-2'>
        <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound = {setVehicleFound}/>
      </div>

      <div ref={VehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 flex flex-col gap-2'>
        <LookingForDriver setVehicleFound = {setVehicleFound} setConfirmedRidePanel={setConfirmedRidePanel} setWaitingForDriver = {setWaitingForDriver}/>
      </div>

      <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 flex flex-col gap-2'>
        <WaitForDriver />
      </div>

        
    </div>
  )
}

export default UserHome
