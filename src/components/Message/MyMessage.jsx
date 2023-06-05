import React from 'react'


const MyMessage = ({ message, time }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{time}</span>
      </div>
      <div className="bg-red-500 my-2 rounded-full text-white float-right py-3 px-4 w-fit">
        {message}
      </div>
    </>
  )
}

export default MyMessage