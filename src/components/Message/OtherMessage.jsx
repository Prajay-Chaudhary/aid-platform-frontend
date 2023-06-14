import React from 'react'


const OtherMessage = ({ message, messadeDate, messageTime }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{messadeDate}</span>
      </div>
      <div className="bg-white my-2 rounded-full text-black py-6 px-4 w-fit flex-col">
        <div>
          {message}
        </div>
        <div className='float-right'>
          <span className='text-zinc-500 text-xs'>
            {messageTime}
          </span>
        </div>
      </div>
    </>
  )
}

export default OtherMessage