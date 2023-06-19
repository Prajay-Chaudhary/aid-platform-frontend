import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react';

const ArchivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [requestStatus, setRequestStatus] = useState('unfulfilled');
  const token = JSON.parse(sessionStorage.getItem('token'));
  const current_user = JSON.parse(sessionStorage.getItem('user'));

  // get all my unfulfilled requests that the current user have.
  const getRequests = async (e) => {
    try {
      const response = await fetch('http://localhost:3001/requests/archived_requests', {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      const data = await response.json()
      setRequests(data)
      console.log("archived_requests:", data)
    } catch (error) {
      alert(" Please Try later ")
    }
  }

  // update request sitation to unfulfilled

  const handleSubmit = async (id) => {

    try {
      const response = await fetch(`http://localhost:3001/requests/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ request_status: 'unfulfilled' }),
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      const data = await response.json()
      setRequests(data)
      console.log("data passed for unfulfilled:", data)
    } catch (error) {
      alert(" Please Try later ")
    }
  }

  useEffect(() => {
    getRequests()
  }, [requestStatus]);

  return (
    <>
      {/* for archived */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {requests && requests.map((request, index) => {
          return (
            <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 hover:shadow-lg">
              <a href="#">
                <img className="rounded-t-lg" src={request.image} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{request.title}</h5>
                </a>
                <div className='flex flex-row justify-center gap-2'>
                  <div>
                    <Button
                      type="submit"
                      className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
                    >
                      See Details
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      gradientDuoTone="purpleToPink"
                      onClick={() => handleSubmit(request.id)}
                      outline
                    >
                      republish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default ArchivedRequests