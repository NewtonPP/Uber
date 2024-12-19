import React from 'react'

const CaptainDetails = () => {
  return (
   <div>
    <div className='h-1/2 p-4' >
        <div className='flex items-center justify-between '>
          <div className='flex items-center justify-start gap-2'>
            <img className='h-20 w-20 rounded-full object-cover' src='https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww'></img>
            <h4 className='text-lg font-medium'>John Chadwick</h4>
          </div>

          <div>
            <h4 className='text-xl font-semibold'>$127.86</h4>
            <p className='text-sm font-medium text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex justify-center gap-3  bg-gray-50 mt-4 p-4 rounded-xl'>
          <div className='text-center'>
            <i className='text-2xl font-thin ri-timer-2-line'></i>
            <h5 className='text-lg font-medium'>12.22</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
          </div>

          <div className='text-center'>
            <i className='text-2xl font-thin ri-speed-up-line'></i>
            <h5 className='text-lg font-medium'>12.22</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
          </div>
          <div className='text-center'>
            <i className='text-2xl font-thin ri-booklet-line'></i>
            <h5 className='text-lg font-medium'>12.22</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
          </div>
          <div></div>
        </div>
    </div>
   </div>
  )
}

export default CaptainDetails
