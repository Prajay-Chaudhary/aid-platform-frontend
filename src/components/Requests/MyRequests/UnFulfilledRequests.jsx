import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react';

const UnFulfilledRequests = () => {

  const [requests, setRequests] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('token'));

  // get all my unfulfilled requests that the current user have.
  const getRequests = async (e) => {
    try {
      const response = await fetch('http://localhost:3001/requests/unfulfilled_requests', {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      const data = await response.json()
      setRequests(data)
      console.log("unfulfilled_requests:", data)
    } catch (error) {
      alert(" Please Try later ")
    }
  }



  const handleSubmit = async (id) => {

    try {
      const response = await fetch(`http://localhost:3001/requests/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ request_status: 'fulfilled' }),
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      const data = await response.json()
      const newData = requests.filter(req => req.id != id) // this function allow to filter request array and return the array of request without include current request that we just passed for fulfilled.
      setRequests(newData)

      console.log("data passed for unfulfilled:", data)
    } catch (error) {
      alert(" Please Try later ")
    }
  }

  useEffect(() => {
    getRequests()
  }, []);



  return (
    <>
      {/* for unfulfilled */}
      <div>
        {requests.length > 0 ? (
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
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{request.title}</h5>
                      </a>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <div>
                        <Button
                          type="submit"
                          color="gray"
                          className='hover:text-yellow-900 focus:outline-none focus:ring-4 focus:text-yellow-900 focus:ring-yellow-900 dark:focus:ring-yellow-900'
                          outline
                          onClick={() => handleSubmit(request.id)}
                        >
                          Mark as Fulfilled
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>) : (
          <div className='flex text-center justify-center mt-3 text-2xl font-bold'>
            <h3>No requests yet. Your unfulfilled requests will be shown here.</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default UnFulfilledRequests