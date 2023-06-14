import React from 'react'


const MyMessage = ({ message, messadeDate, messageTime }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{messadeDate}</span>
      </div>
      <div className="bg-red-500 my-2 rounded-full text-white float-right py-3 px-4 w-fit flex-col">
        <div>
          {message}
        </div>
        <div className='float-right'>
          <span className='text-zinc-600 text-xs'>
            {messageTime}
          </span>
        </div>
      </div>
    </>
  )
}

export default MyMessage