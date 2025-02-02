import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import {useGSAP} from "@gsap/react"
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import WaitForDriver from '../components/WaitForDriver';
import LookingForDriver from '../components/LookingForDriver';
import { SocketDataContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';

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

  const [PickupSuggestions, setPickupSuggestions] = useState([]);
  const [DestinationSuggestions, setDestinationSuggestions] = useState([])
  const [ActiveField, setActiveField] = useState(null)
  const [isPickupActive, setIsPickupActive] = useState(null)
  
  const [Fare, setFare] = useState({})
  const [Ride, setRide] = useState(null)


  const {SendMessage, Receive, socket} = useContext(SocketDataContext)
  const {User} = useContext(UserDataContext)
  useEffect(()=>{
    SendMessage("join",  {userType:"user", userId:User._id})
  },[User])
  
  socket.on("RideConfirmed", ride =>{
    setVehicleFound(false)
    setConfirmedRidePanel(false)
    setWaitingForDriver(true)
    setRide(ride)
  })
  
  const HandlePickupChange = (pickup) =>{
    if(pickup === ""){
      setPickupSuggestions([])
      setIsPickupActive(null)
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/maps/getsuggestion?input=${pickup}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=>{
      setPickupSuggestions(response.data)
      setIsPickupActive(true)
      }
    )
    .catch((error)=>console.log(error))
  }

  const HandleDestinationChange = (destination) =>{
    if(destination === ""){
      setDestinationSuggestions([])
      setIsPickupActive(null)
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/maps/getsuggestion?input=${destination}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=>{
      setDestinationSuggestions(response.data)
      setIsPickupActive(false)
    })
    .catch((error)=>console.log(error))
  }


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

const FindTrip = () =>{
  axios.get(`${import.meta.env.VITE_BASE_URL}/rides/getfare?pickup=${PickupLocation}&destination=${Destination}`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((response)=>{
    if(response.status === 200){
      setisVehiclePanelOpen(true)   
      setPanelOpen(false)
      setFare(response.data)
      console.log(response.data)
    }
  })
}

const [RideData, setRideData] = useState({})
const CreateRide = (VehicleType)=>{
  console.log(PickupLocation, Destination)
  axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
    pickup:PickupLocation,
    destination:Destination,
    VehicleType
  },{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((response)=>{
    setRideData(response.data)
  })
}

  return (
    <div className='h-screen overflow-hidden relative '>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>

      <div className=' h-screen w-screen '>
       <LiveTracking/>
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
          value={PickupLocation}
          onClick={()=>setPanelOpen(true)}
          onChange={(e)=>{
            setPickupLocation(e.target.value)
            HandlePickupChange(e.target.value)
           }}
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
          type='text' placeholder='Add a pick-up location'></input>


          <input type='text' 
          value={Destination}
           onClick={()=>setPanelOpen(true)}
           onChange={(e)=>{
            setDestination(e.target.value)
            HandleDestinationChange(e.target.value)}}
           className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
           placeholder='Enter your destination'></input>
        </form>
        <button className='bg-black text-white p-2 rounded-xl px-4 mt-4 w-full'
        onClick={()=>{
          FindTrip()
        }}>
          Find Trip
        </button>
        </div>

        <div ref={panelRef} className='h-0 bg-white'>
            <LocationSearchPanel
            setIsPickupActive = {setIsPickupActive} 
            setPickupLocation={setPickupLocation}
            setDestination={setDestination}
            isPickupActive = {isPickupActive}
             PickupSuggestions = {PickupSuggestions}
             DestinationSuggestions = {DestinationSuggestions}
             setPanelOpen = {setPanelOpen} VehiclePanel={isVehiclePanelOpen} setVehiclePanel = {setisVehiclePanelOpen}/>
        </div>

      </div>

      <div ref={VehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 flex flex-col gap-2 pt-12'>
        <VehiclePanel
        CreateRide = {CreateRide}
        Fare={Fare} setConfirmedRidePanel={setConfirmedRidePanel} setisVehiclePanelOpen = {setisVehiclePanelOpen}/>
      </div>

      <div ref={ConfirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 flex flex-col gap-2'>
        <ConfirmedRide
        CreateRide = {CreateRide}
        Fare = {Fare} 
        Pickup = {PickupLocation}
        Destination = {Destination}
        setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound = {setVehicleFound}/>
      </div>

      <div ref={VehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 flex flex-col gap-2'>
        <LookingForDriver 
        RideData = {RideData}
        setVehicleFound = {setVehicleFound} setConfirmedRidePanel={setConfirmedRidePanel} setWaitingForDriver = {setWaitingForDriver}/>
      </div>

      <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 flex flex-col gap-2'>
        <WaitForDriver Ride = {Ride} RideData= {RideData}/>
      </div>

        
    </div>
  )
}

export default UserHome
