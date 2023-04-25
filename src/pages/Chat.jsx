import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [user1Id, setUser1Id] = useState('');
  const [user2Id, setUser2Id] = useState('');

  // Fetch all messages for the current user
  const fetchMyMessages = async () => {
    const response = await axios.get('http://127.0.0.1:3001/messages/my_messages');
    setSentMessages(response.data.sent_messages);
    setReceivedMessages(response.data.received_messages);
  };

  // Fetch messages between two users
  const fetchConversation = async () => {
    const response = await axios.get(`http://127.0.0.1:3001/messages/conversation/${user1Id}/${user2Id}`);
    setConversationMessages(response.data);
  };

  // Call fetchMyMessages when the component mounts
  useEffect(() => {
    fetchMyMessages();
  }, []);

  return (
    <div>
      <h2>My Messages</h2>
      <h3>Sent Messages</h3>
      <ul>
        {sentMessages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>
      <h3>Received Messages</h3>
      <ul>
        {receivedMessages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>
      <h2>Conversation</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchConversation();
      }}>
        <label>
          User 1 ID:
          <input type="text" name="user1Id" value={user1Id} onChange={(e) => setUser1Id(e.target.value)} />
        </label>
        <br />
        <label>
          User 2 ID:
          <input type="text" name="user2Id" value={user2Id} onChange={(e) => setUser2Id(e.target.value)} />
        </label>
        <br />
        <button type="submit">Fetch Conversation</button>
      </form>
      <ul>
        {conversationMessages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;






