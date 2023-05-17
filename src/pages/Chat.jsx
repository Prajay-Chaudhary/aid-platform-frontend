import React from 'react'
import ChatPage from '../components/Message/ChatPage'
import ConversationPage from '../components/Message/ConversationPage'
const Chat = () => {
  console.log("test test chat")
  return (
    <>
      <div className='flex'>
        <div className='w-2/5'><ChatPage /></div>
        <div className='w-3/5'><ConversationPage /></div>
      </div>
    </>
  )
}

export default Chat