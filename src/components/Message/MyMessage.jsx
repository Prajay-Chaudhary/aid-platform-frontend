import React from 'react'


const MyMessage = ({ message, messadeDate, messageTime }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{messadeDate}</span>
      </div>
      <div className='flex flex-col float-right'>

        <div className="bg-red-500 my-2 rounded-full text-white py-3 px-4 w-fit">
          {message}
        </div>
        <span className='text-zinc-600 text-xs w-fit self-end'>
          {messageTime}
        </span>
      </div>
    </>
  )
}

export default MyMessage