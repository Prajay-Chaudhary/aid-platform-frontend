import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';

const FulfillmentDetails = () => {

  const [volunteers, setVolunteers] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('token'));
  const { id } = useParams(); // Retrieve the request ID from the URL parameter


  useEffect(() => {
    // Get the conversation between the current user and the selected user
    const getVolunteers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/requests/fulfilled-requests${id}`, {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}` // send authorized token to the server
          }
        });

        const result = await res.json();
        setVolunteers(result);

        console.log('Volunteers', result);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    getVolunteers();
  }, []);
  return (
    <>
      <div>
        <div className='flex justify-center my-10'>
          <h1 className='text-black font-extrabold text-4xl'>List of Fulfillers</h1>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {volunteers && volunteers?.map((volunteer, index) => {
            return (
              <div key={volunteer.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 hover:shadow-lg">
                <div className='flex justify-center text-center'>
                  <a href="#">
                    <p className='font-bold'>Fulfiller: </p><span>{volunteer.first_name}</span> <span>{volunteer.last_name} </span>
                  </a>
                </div>
                <div className="p-5">
                  <div className='h-[75px]'>
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{volunteer.email}</h5>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </>
  )
}

export default FulfillmentDetails