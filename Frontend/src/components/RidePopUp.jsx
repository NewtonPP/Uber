
import React, { useEffect } from 'react'

const RidePopUp = ({setRidePopUpPanel, setConfirmedRidePopUpPanel, Customer, ConfirmRide}) => {
    useEffect(()=>{
        setTimeout(()=>setRidePopUpPanel(false),10000)
    },[])
    return  (
    <div>
<h3 className='text-xl font-semibold py-2'>New ride available</h3>
<div className='flex items-center justify-between mt-3 bg-yellow-400 rounded-lg'>
    <div className='flex items-center gap-3 p-3'>
        <img className='h-16 w-16 rounded-full'  src='https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww'></img>
        <h2 className='text-lg font-medium'>{Customer?.user?.FullName?.FirstName + " " + Customer?.user?.FullName?.LastName}</h2>
    </div>
    <h5 className='text-lg font-semibold p-3'>2.2 miles</h5>

    </div>

<div className='flex justify-between items-center flex-col gap-2'>
<div className='w-full flex flex-col gap-2'>
    <div className='flex items-center gap-5 border-b-2 py-2 '>
        <i className='text-lg ri-map-pin-user-fill'></i>
        <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm text-gray-600'>{Customer?.pickup}</p>
        </div>
    </div>
    <div className='flex items-center gap-5 border-b-2 py-2'>
    <i className='text-lg ri-map-pin-2-fill'></i>
        <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm text-gray-600'>{Customer?.destination}</p>
        </div>
    </div>
    <div className='flex items-center gap-5 py-2'>
    <i className='text-lg ri-currency-line'></i>
    <div>
        <h3 className='text-lg font-medium'>${Customer?.fare}</h3>
        <p className='text-sm text-gray-600'>Cash</p>
    </div>
    </div>
</div>
<button className=' mt-5 w-full bg-black text-white font-semiboldr rounded-lg p-2' onClick={()=>{setRidePopUpPanel(false)
    setConfirmedRidePopUpPanel(true)
    ConfirmRide()
}}>Accept</button>
<button className=' mt-5 w-full bg-black text-white font-semiboldr rounded-lg p-2' onClick={()=>setRidePopUpPanel(false )}>Ignore</button>
</div>
    </div>
  )
}

export default RidePopUp
