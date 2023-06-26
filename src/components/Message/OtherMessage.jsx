import React from 'react'
import { Tooltip } from 'flowbite-react';

const OtherMessage = ({ message, messadeDate, messageTime, firstName, lastName }) => {
  const firstInitial = firstName ? firstName.slice(0, 1) : '';
  const lastInitial = lastName ? lastName.slice(0, 1) : '';
  const fullName = firstName + ' ' + lastName;

  return (
    <>
      <div className='justify-center'>
        <span className='text-slate-400 text-xs'>{messadeDate}</span>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <div className='bg-zinc-100 rounded-full p-1 w-8 h-8 flex items-center justify-center mr-1'>
            <Tooltip
              content={fullName}
              placement="left"
            >
              <p className='text-red-500 text-sm'>{firstInitial} {lastInitial}</p>
            </Tooltip>
          </div>
          <div className="background-color rounded-2xl py-3 px-4 w-fit">
            <div>
              <Tooltip
                content={messageTime}
                placement="right"
              >
                <p className='max-w-[500px] text-white'>
                  {message}
                </p>
              </Tooltip>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtherMessage