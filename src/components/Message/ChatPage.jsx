import React, { useState, useEffect } from 'react';
import { Avatar } from 'flowbite-react'

function ChatPage() {
  const [allMessages, setAllMessages] = useState([])
  const current_user = JSON.parse(sessionStorage.getItem('token'));


  useEffect(() => {
    // Get all the users the users sent or received the messages
    const getMessages = async () => {
      try {
        const res = await fetch('http://localhost:3001/messages', {
          method: "get",
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${current_user}` //send authorized token of current_user to the server 
          }
        })

        const result = await res.json()
        setAllMessages(result)
        console.log('result:', result);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    getMessages();
  }, []);

  return (
    <>
      <div className='text-center p-6'>
        <h1 className='text-red-600 text-2xl mb-3'>Active Conversations:</h1>
        <ul>
          {allMessages && allMessages.map(({ body, created_at, id, sender_id, receiver_id }) => {

            //change date format
            const formattedDate = new Date(created_at).toLocaleString();
            return (
              <a href="#" className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-1 hover:bg-sky-500 hover:ring-sky-500">
                <li key={id}>
                  <div className='flex space-x-4'>
                    <div className="">
                      <Avatar
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded={true}
                      />
                    </div>
                    <div>
                      <span>sender id:{sender_id} | receiver id: {receiver_id}</span>
                      <p> <span className='text-md group-hover:text-white'> {body} </span>| <span className='text-slate-600 text-xs'>Sent on: {formattedDate}</span></p>
                    </div>
                  </div>
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ChatPage;