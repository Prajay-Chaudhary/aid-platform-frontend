import React, { useState, useEffect } from 'react';

function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const current_user = JSON.parse(sessionStorage.getItem('token'));

  if (!current_user) {
    return (
      <div>We can not display any message now please select a conversation.</div>
    )
  }

  useEffect(() => {
    // Get the conversation between the current user and the selected user
    const getMessages = async () => {
      try {
        const res = await fetch('http://localhost:3001/messages/conversations', {
          method: "get",
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${current_user}` //send authorized token to the server 
          }
        })
        const result = await res.json()
        setMessages(result);
        console.log("conversations", result);

      } catch (err) {
        console.log("Error:", err)
      }
    }

    getMessages()

  }, []);



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const body = event.target.elements.body.value;

    // Send a new message to the selected user
    fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${current_user}` //send authorized token to the server 
      },
      body: JSON.stringify({
        body: body
      })
    }).then(response => response.json())
      .then(data => {
        setMessages([...messages, data]);
        event.target.elements.body.value = '';
        console.log("data:", data);
      });
  };

  return (
    <>
      <div className=''>
        <h1 className='text-center font-bold'>Conversation with selected user</h1>
        <ul>
          <div>
            {messages.map(message => (
              <li key={message.id}>
                {message.sender_id === current_user.id ? 'Me' : current_user.id}
              </li>
            ))}
          </div>
        </ul>
        <form className="fixed bottom-0 bg-purple-600 flex py-5 px-6 rounded-lg" onSubmit={handleFormSubmit}>
          <input
            id="messageInput"
            name="body"
            type="text"
            className="flex-1 mr-3 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Type message..."
          />
          <button type="submit" className="px-4 py-2 bg-white text-red-600 rounded-lg">Send</button>
        </form>
      </div>
    </>
  );
}

export default ConversationPage;
