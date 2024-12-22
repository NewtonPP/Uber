import React from 'react'

const VehiclePanel = ({CreateRide, setisVehiclePanelOpen, setConfirmedRidePanel, Fare}) => {
  return (
    <div>
      <h5 
        onClick={()=>{
          setisVehiclePanelOpen(false)
         }}
        className='absolute top-1 left-4 text-xl'><i className="ri-arrow-down-wide-line"></i></h5>
        <h2 className='text-xl font-semibold py-2'>Choose a vehicle</h2>

        
          <div className='flex border-2 hover:border-black rounded-xl items-center justify-between p-5' onClick={()=>{
            setConfirmedRidePanel(true)
            CreateRide("car")
            }}>
            <img className="h-16" src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png'></img>
            <div className='w-1/2'>
              <h4 className='font-medium text-sm'>UberGo <span><i className='ri-user-3-fill'></i>3</span></h4>
              <h5 className='font-medium text-sm' >2 mins away</h5>
              <p className='font-normal text-xs'>Affordable, compact rides</p>
            </div>
            <h2 className='text-xl font-semibold'>${Fare.car}</h2>
          </div>

          <div className='flex border-2 hover:border-black rounded-xl items-center justify-between p-5'
          onClick={()=>{
            setConfirmedRidePanel(true)
            CreateRide("motorcycle")
          }}>
            <img className="h-16" src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'></img>
            <div className='w-1/2'>
              <h4 className='font-medium text-sm'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
              <h5 className='font-medium text-sm' >2 mins away</h5>
              <p className='font-normal text-xs'>Affordable, motorcycle rides</p>
            </div>
            <h2 className='text-xl font-semibold'>${Fare.motorcycle}</h2>
          </div>
    </div>
  )
}

export default VehiclePanel
