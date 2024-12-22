import React from 'react'

const LocationSearchPanel = ({setIsPickupActive,VehiclePanel, setVehiclePanel, setPanelOpen, PickupSuggestions, DestinationSuggestions,isPickupActive
  ,setPickupLocation, setDestination
}) => {    
  return (
    <div>
      {isPickupActive === true ? 
       (
        <>
        <h4 className='text-xl font-semibold p-4'> Choose a pickup location</h4>
       { PickupSuggestions?.map((pickup, index)=>{
            return(
        <div onClick={()=>{
          setPickupLocation(pickup.description)
          setIsPickupActive(null)
          // setVehiclePanel(true)
          //   setPanelOpen(false)
        }} key={index} className='flex items-center hover:border-black border-2 justify-start gap-4 p-5 mb-2'>
        <h2 className='bg-[#eee] h-10 w-14 rounded-full flex items-center justify-center'> <i className='ri-map-pin-fill'></i></h2>
        {<h4 className='font-medium'>{pickup.description}</h4>}
      </div>)
        })}
     </> ):
     isPickupActive===false ?
     (
        <>
        <h4 className='text-xl font-semibold p-4'> Choose a destination location</h4>
       { DestinationSuggestions?.map((destination, index)=>{
            return(
        <div onClick={()=>{
          setDestination(destination.description)
          setIsPickupActive(null)
            // setVehiclePanel(true)
            // setPanelOpen(false)
        }} key={index} className='flex items-center hover:border-black border-2 justify-start gap-4 p-5 mb-2'>
        <h2 className='bg-[#eee] h-10 w-14 rounded-full flex items-center justify-center'> <i className='ri-map-pin-fill'></i></h2>
        <h4 className='font-medium'>{destination.description}</h4>
      </div>)
        })}
     </> 
     )
      :""
      }
    </div>
  )
}

export default LocationSearchPanel
