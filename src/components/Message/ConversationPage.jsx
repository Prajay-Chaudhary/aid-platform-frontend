import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import MyMessage from './MyMessage';
import OtherMessage from './OtherMessage';
import { Avatar } from 'flowbite-react'
import chat2 from '../../images/chat2.png'

function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(false);
  const [name, setName] = useState("");
  const token = JSON.parse(sessionStorage.getItem('token'));
  const current_user = JSON.parse(sessionStorage.getItem('user'));
  const { user_id } = useParams();
  const messagesEndRef = useRef(null); // Create a ref for the end of the message list & used to scroll to the latest message in the message list


  useEffect(() => {
    // Get the conversation between the current user and the selected user
    const getMessages = async () => {
      try {
        const res = await fetch(`http://localhost:3001/messages/conversation/${user_id}`, {
          method: 'get',
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}` // send authorized token to the server
          }
        });

        const result = await res.json();
        setMessages(result);

        console.log('conversations', result);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    getMessages();
  }, [user_id, reloadMessages]);

  useEffect(() => {
    // Scroll to the latest message when the component mounts or when new messages are received
    scrollToLatestMessage();
  }, [messages]);

  const scrollToLatestMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { body } = event.target.elements;

    const data = {
      sender_id: current_user.id, // Include the sender_id based on the logged-in user
      receiver_id: user_id,
      body: body.value
    };

    //post request to create message
    const res = await fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const response = await res.json();

    if (res.ok) {
      // Message successfully created
      setReloadMessages(!reloadMessages);
      body.value = '';
    } else {
      // Handle error response
      console.log(response); // Check the error response for more details
    }
  };


  return (
    <>
      <div>
        {user_id ? (
          <div className="p-2 md:p-6 min-h-screen">

            <div className="p-3 bg-white-400 rounded-lg shadow-lg">
              <div className='flex space-x-2 justify-center'>
                <div>
                  <Avatar rounded />
                </div>
                <div>
                  <h1 className='font-bold text-red-600 text-2xl  mb-3'>{user_id}</h1>
                </div>
              </div>
            </div>
            <div className="message-list-container flex flex-col text-center h-screen overflow-y-auto">

              {/* creates a new array with the elements of messages in reverse order.
            Then, the map function is used to iterate over the reversed array and render the messages accordingly */}
              {messages.slice(0).reverse().map((message, index) => {
                // { message.sender_id === user_id ? setName(message.sender_first_name) : "" }
                //setName((_e) => _e = "message.sender_first_name")
                //console.log("testtttttt :", message, current_user.id)
                return (<div key={index}>
                  {message.sender_id === current_user.id ? <MyMessage message={message.message_body} messadeDate={message.message_created_on} messageTime={message.message_created_at} /> : <OtherMessage firstName={message.sender_first_name} lastName={message.sender_last_name} message={message.message_body} messadeDate={message.message_created_on} messageTime={message.message_created_at} />}
                </div>)

              })}
              <div ref={messagesEndRef} /> {/* Use the ref to scroll to the latest message */}

            </div>
            <form
              className="sticky top-[100vh] background-color flex py-5 px-6 rounded-lg drop-shadow-lg hover:drop-shadow-2xl"
              onSubmit={handleFormSubmit}
            >
              <TextInput
                id="messageInput"
                name="body"
                type="text"
                className="flex-1 py-2 px-1 mr-2 rounded-lg"
                placeholder="Type message..."
                required={true}
              />
              <Button
                type="submit"
                size="lg"
                className='bg-white txt-color hover:bg-yellow-900 focus:outline-none focus:ring-4 focus:ring-yellow-900 dark:focus:ring-yellow-900  mt-1'
              >
                Send
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full mt-14">
            <div>
              <img src={chat2} alt="chat image" className="mx-auto object-contain h-[350px]" />
            </div>
            <div className='flex flex-col justify-center text-center mt-2'>
              <h1 className='text-2xl font-extrabold'>
                Conversation page
              </h1>
              <p>Send and receive messages here. Just select an user from the user list.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ConversationPage;
