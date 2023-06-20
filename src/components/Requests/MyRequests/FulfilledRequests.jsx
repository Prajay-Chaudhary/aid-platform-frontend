import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react';

const FulfilledRequests = () => {
  const [requests, setRequests] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('token'));
  const current_user = JSON.parse(sessionStorage.getItem('user'));

  // get all my fulfilled requests that the current user have.
  const getRequests = async (e) => {
    try {
      const response = await fetch('http://localhost:3001/requests/fulfilled_requests', {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      const data = await response.json()
      setRequests(data)
      console.log("fulfilled_requests:", data)
    } catch (error) {
      alert(" Please Try later ")
    }
  }

  useEffect(() => {
    getRequests()
  }, []);

  return (
    <>
      {/* for fulfilled */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {requests && requests?.map((request, index) => {
          return (
            <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 hover:shadow-lg">
              <div className='flex justify-center'>
                <a href="#">
                  <img className="rounded-t-lg h-[225px] w-full" src={request.image} alt="request image" />
                </a>
              </div>
              <div className="p-5">
                <div className='h-[75px]'>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{request.title}</h5>
                  </a>
                </div>
                <div className='flex justify-center'>
                  <Button
                    type="submit"
                    className=" background-color hover:bg-yellow-900 "
                  >
                    See Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default FulfilledRequests