import React from 'react'


const OtherMessage = ({ message, time }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{time}</span>
      </div>
      <div className="bg-white my-2 rounded-full text-black py-3 px-4 w-fit">
        {message}
      </div>
    </>
  )
}

export default OtherMessage