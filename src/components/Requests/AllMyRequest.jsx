import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'flowbite-react';
import UnFulfilledRequests from '../Requests/MyRequests/UnFulfilledRequests';
import FulfilledRequests from '../Requests/MyRequests/FulfilledRequests';
import ArchivedRequests from '../Requests/MyRequests/ArchivedRequests';

const AllMyRequest = () => {

  const [requests, setRequests] = useState([])
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
  }, []);



  return (
    <>
      <div className='flex flex-col items-center mx-4 lg:mx-6'>
        <div className='m-8 p-8'>
          <p className='text-6xl font-bold txt-color'>
            My Requests
          </p>
        </div>

        <div className='w-full mx-6'>
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
              title="Expired"
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