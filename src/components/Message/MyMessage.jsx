import React from 'react'


const MyMessage = ({ message }) => {
  return (
    <>
      <div className="bg-red-500 my-2 rounded-full text-white float-right py-3 px-4 w-fit"> {message} </div>
    </>
  )
}

export default MyMessage