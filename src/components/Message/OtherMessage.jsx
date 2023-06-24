import React from 'react'
import { Avatar } from 'flowbite-react';

const OtherMessage = ({ message, messadeDate, messageTime }) => {
  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{messadeDate}</span>
      </div>
      <div className='flex flex-col'>

        <div className='flex flex-row'>
          <div className='mr-1'>
            <Avatar rounded />
          </div>
          <div className='flex flex-col h-fit w-fit'>
            <div className="background-color rounded-2xl py-3 px-4 w-fit">
              <div>
                <p className='max-w-[500px] text-white'>
                  {message}
                </p>
              </div>
            </div>
            <span className='text-zinc-600 text-xs w-fit self-center mt-1'>
              {messageTime}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtherMessage