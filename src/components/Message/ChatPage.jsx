import React, { useState, useEffect } from 'react';
import { Avatar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

function ChatPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // New state variable to track the selected user
  const current_user = JSON.parse(sessionStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    // Get all the users the users sent or received the messages
    const getUsers = async () => {
      try {
        const res = await fetch('http://localhost:3001/messages', {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${current_user}`, //send authorized token of current_user to the server
          },
        });

        const result = await res.json();
        setAllUsers(result);
        console.log('result:', result);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    getUsers();
  }, []);

  const handleConversationClick = (interacted_user_id) => {
    setSelectedUserId(interacted_user_id); // Update the selected user ID when a conversation is clicked
    navigate(`/chat/${interacted_user_id}`); // will navigate the user to the chat page for that specific user.
  };

  return (
    <>
      <div className='text-center mb-3'>
        <h1 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl mb-3'>
          Active Conversations:
        </h1>
      </div>
      <div className='text-center h-screen overflow-y-auto'>
        {allUsers &&
          allUsers.map(({ id, interacted_user_id, interacted_fname, interacted_lname, message_body, time_ago }) => (
            <Link
              to={`/chat/${interacted_user_id}`}
              key={id}
              className={`group block max-w-xs mx-0 md:mx-auto rounded-lg py-2 md:p-6 ${interacted_user_id === selectedUserId ? 'ring-sky-900 bg-blue-300 border-solid border-2 border-sky-500' : 'ring-slate-900/5 bg-white'
                } shadow-lg space-y-1 hover:bg-sky-500 hover:ring-sky-500`}
              onClick={() => handleConversationClick(interacted_user_id)}
            >
              <div className='flex space-x-4'>
                <div className='pl-2 md:pl-0'>
                  <Avatar img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded={true} />
                </div>
                <div>
                  <span className='font-bold text-xl md:text-2xl mr-2'>{interacted_fname}</span>
                  <span className='font-bold text-xl md:text-2xl'>{interacted_lname}</span>
                </div>
              </div>
              <div className='flex ml-2 md:ml-6 pl-0 md:pl-4'>
                <div>
                  <span className='text-md group-hover:text-white'>{message_body} </span>
                </div>
                <div className='ml-1 md:ml-4'>
                  <span className='text-slate-600 text-xs'>{time_ago} ago</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default ChatPage;


