import React from 'react'
import axios from "axios"
const LookingForDriver = ({RideData, setVehicleFound, setConfirmedRidePanel, setWaitingForDriver}) => {
    return (
        <div>
             <h5 
            onClick={()=>{setVehicleFound(false)
                setConfirmedRidePanel(false)
            }}
            className='absolute top-1 left-4 text-xl'><i className="ri-arrow-down-wide-line"></i></h5>
    
    <h2 className='text-xl font-semibold py-2'>Looking for nearby drivers</h2>
    
    <div className='flex justify-between items-center flex-col gap-2'>
    <img className='h-28' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png'></img>
    <div className='w-full flex flex-col gap-2'>
        <div className='flex items-center gap-5 border-b-2 py-2 '>
            <i className='text-lg ri-map-pin-user-fill'></i>
            <div>
                <p className='text-sm text-gray-600'>{RideData.pickup}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 border-b-2 py-2'>
        <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <p className='text-sm text-gray-600'>{RideData.destination}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 py-2'>
        <i className='text-lg ri-currency-line'></i>
        <div>
            <h3 className='text-lg font-medium'>${RideData.fare}</h3>
            <p className='text-sm text-gray-600'>Cash</p>
        </div>
        </div>

        <div className='flex items-center gap-5 py-2 w-full justify-center bg-blue-500 text-white rounded-md'>
        <div>
            <h3 className='text-base font-medium'>{RideData.status}...</h3>
        </div>
        </div>
    </div>
    <button className=' mt-5 w-full bg-black text-white font-semiboldr rounded-lg p-2' onClick={()=>{
        setWaitingForDriver(true)
        setVehicleFound(false)
        setConfirmedRidePanel(false)
    }}>Confirm</button>
    </div>
    </div>
        
      )
    }

export default LookingForDriver
