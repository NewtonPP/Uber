import React from 'react'

const LocationSearchPanel = ({VehiclePanel, setVehiclePanel, setPanelOpen}) => {
    const Locations = [
        "24B, Near Kapoor's Cafe, Shriyans Coding School, Bhopal",
        "24B, Near Kapoor's Cafe, Shriyans Coding School, Bhopal",
        "24B, Near Kapoor's Cafe, Shriyans Coding School, Bhopal",
        "24B, Near Kapoor's Cafe, Shriyans Coding School, Bhopal"
    ];
    
  return (
    <div>
      {
        Locations.map((location, index)=>{
            return(
        <div onClick={()=>{setVehiclePanel(true)
            setPanelOpen(false)
        }} key={index} className='flex items-center hover:border-black border-2 justify-start gap-4 p-5 mb-2'>
        <h2 className='bg-[#eee] h-10 w-14 rounded-full flex items-center justify-center'> <i className='ri-map-pin-fill'></i></h2>
        <h4 className='font-medium'>{location}</h4>
      </div>
            )
        })
      }
    </div>
  )
}

export default LocationSearchPanel
