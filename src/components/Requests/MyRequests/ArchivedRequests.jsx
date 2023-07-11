import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react';
import API_BASE_URL from '../../../config/apiConfig';
import { token } from '../../../utils/auth';

const ArchivedRequests = () => {
  const [requests, setRequests] = useState([]);

  // get all my unfulfilled requests that the current user have.
  const getRequests = async (e) => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests/archived_requests`, {
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
      const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ request_status: "unfulfilled" }),
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      if (response.ok) {
        const updatedRequest = await response.json();
        console.log("Request updated:", updatedRequest);
        // Perform any necessary actions after successful update
      } else {
        throw new Error('Failed to update the request');
      }
    } catch (error) {
      alert("Please try again later");
      console.error(error);
    }
  };


  useEffect(() => {
    getRequests()
  }, []);

  return (
    <>
      {/* for archived */}
      <div>
        {requests.length > 0 ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {requests && requests.map((request, index) => {
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
                          republish
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>) : (
          <div className='flex text-center justify-center mt-3 text-2xl font-bold'>
            <h3>No requests yet. Your archived requests will be shown here.</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default ArchivedRequests