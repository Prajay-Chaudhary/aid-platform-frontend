import React, { useState, useEffect } from 'react';
import { Avatar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';

function ChatPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const current_user = JSON.parse(sessionStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/messages`, {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${current_user}`,
          },
        });

        const result = await res.json();
        setAllUsers(result);
        console.log('usersList:', result);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    getUsers();


  }, [current_user]);

  // set selected user id to a state and pass that id to url
  const handleConversationClick = (interacted_user_id) => {
    setSelectedUserId(interacted_user_id);
  };

  return (
    <>
      <></>
      <div>
        <div className='text-center my-6'>
          <h1 className='bg-gradient-to-r from-red-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl mb-3'>
            Active Conversations:
          </h1>
        </div>
        <div className='text-center h-screen overflow-y-auto'>
          {allUsers &&
            allUsers.map(({ id, interacted_user_id, interacted_fname, interacted_lname, message_body, time_ago }, index) => (
              <Link
                to={`/chat/${interacted_user_id}`}
                key={index}
                className={`group block max-w-xs mx-auto rounded-lg py-2 md:p-6 ${interacted_user_id === selectedUserId
                  ? 'text-white background-color border-solid border-2 border-yellow-900'
                  : 'ring-slate-900/5 bg-white'
                  } shadow-lg space-y-1 hover:bg-yellow-600 hover:ring-sky-500`}
                onClick={() => handleConversationClick(interacted_user_id)}
              >
                <div className='flex space-x-4'>
                  <div className='pl-2 md:pl-0'>
                    <Avatar rounded />
                  </div>
                  <div className='line-clamp-1'>
                    <span className='font-bold text-xl md:text-2xl mr-2'>{interacted_fname}</span>
                    <span className='font-bold text-xl md:text-2xl'>{interacted_lname}</span>
                  </div>
                </div>
                <div className='flex flex-row ml-6 pl-4'>
                  <div>
                    <span className='text-md group-hover:text-white'>{message_body} </span>
                  </div>
                  <div className='ml-1 md:ml-4'>
                    <span className='text-slate-400 text-xs'>{time_ago} ago</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export default ChatPage;






