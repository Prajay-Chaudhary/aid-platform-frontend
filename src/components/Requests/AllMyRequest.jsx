import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'flowbite-react';
import UnFulfilledRequests from '../Requests/MyRequests/UnFulfilledRequests';
import FulfilledRequests from '../Requests/MyRequests/FulfilledRequests';
import ArchivedRequests from '../Requests/MyRequests/ArchivedRequests';

const AllMyRequest = () => {

  const [requests, setRequests] = useState([])
  const [requestStatus, setRequestStatus] = useState('pending')
  const token = JSON.parse(sessionStorage.getItem('token'));
  const current_user = JSON.parse(sessionStorage.getItem('user'));


  // get all my requests that the current user has created.
  const getRequests = async (e) => {
    try {
      const response = await fetch('http://localhost:3001/requests/my_requests', {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });
      const data = await response.json()
      setRequests(data)
      console.log("my_requests:", data)
    } catch (error) {
      alert(" Please Try later ")
    }
  }



  useEffect(() => {
    getRequests()
  }, [requestStatus]);


  let counter = 0;

  for (let i = 0; i < requests.length; i++) {
    if ((requests[i].requestStatus === "unfulfilled" && current_user.username === requests[i].current_user?.username) || requests[i].requestStatus === "Fulfilled") counter++;
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='m-8 p-8'>
          <p className='text-6xl font-bold'>
            My Requests
          </p>
          <div className='text-center mt-6'>
            <p>You have <span className='text-red-600 text-lg'>{counter}</span> pending request to be fulfilled.</p>
          </div>
        </div>

        <div>
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
          >
            <Tabs.Item
              active
              title="unfulfilled"
            >
              < UnFulfilledRequests />
            </Tabs.Item>
            <Tabs.Item
              title="Fulfilled"
            >
              < FulfilledRequests />
            </Tabs.Item>
            <Tabs.Item
              title="Archived"
            >
              < ArchivedRequests />
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
    </>
  )
}

export default AllMyRequest