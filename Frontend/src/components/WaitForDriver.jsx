import React from 'react'

const WaitForDriver = ({setWaitingForDriver,Ride}) => {
   console.log(Ride)
  return (
    <div>
    <h5 
   className='absolute top-1 left-4 text-xl'><i className="ri-arrow-down-wide-line"></i></h5>

<div className='flex items-center justify-between text-right'>
<img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png'></img> 
<div >
    <h2 className='text-lg font-medium'>{Ride?.captain?.FullName?.FirstName + " "+ Ride?.captain?.FullName?.LastName}</h2>
    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{Ride?.captain?.Vehicle?.Plate}</h4>
    <p className='text-gray-600 text-sm'>{Ride?.captain?.Vehicle?.VehicleType}</p>
</div>
</div>
<div className='flex justify-between items-center flex-col gap-2'>

<div className='w-full flex flex-col gap-2'>
<div className='flex items-center gap-5 border-b-2 py-2 '>
   <i className='text-lg ri-map-pin-user-fill'></i>
   <div>
       <h3 className='text-lg font-medium'>562/11-A</h3>
       <p className='text-sm text-gray-600'>{Ride?.pickup}</p>
   </div>
</div>
<div className='flex items-center gap-5 border-b-2 py-2'>
<i className='text-lg ri-map-pin-2-fill'></i>
   <div>
       <h3 className='text-lg font-medium'>562/11-A</h3>
       <p className='text-sm text-gray-600'>{Ride?.destination}</p>
   </div>
</div>
<div className='flex items-center gap-5 py-2'>
<i className='text-lg ri-currency-line'></i>
<div>
   <h3 className='text-lg font-medium'>${Ride?.fare}</h3>
   <p className='text-sm text-gray-600'>Cash</p>
</div>
</div>
</div>
<button className=' mt-5 w-full bg-black text-white font-semiboldr rounded-lg p-2' >Confirm</button>
</div>
</div>
  )
}

export default WaitForDriver
