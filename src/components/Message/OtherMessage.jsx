import React from 'react'


const OtherMessage = ({ message, messadeDate, messageTime }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{messadeDate}</span>
      </div>
      <div className='flex flex-col'>

        <div className="bg-white my-2 rounded-full text-black py-3 px-4 w-fit">
          {message}
        </div>
        <span className='text-zinc-600 text-xs w-fit self-start'>
          {messageTime}
        </span>
      </div>
    </>
  )
}

export default OtherMessage