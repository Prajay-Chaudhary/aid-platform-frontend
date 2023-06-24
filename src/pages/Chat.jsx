import React from 'react'
import ChatPage from '../components/Message/ChatPage'
import ConversationPage from '../components/Message/ConversationPage'
const Chat = () => {
  return (
    <>
      <div>
        <div className='md:flex h-full w-screen md:m-0 rounded-lg'>
          <div className='w-screen md:w-4/12'><ChatPage /></div>
          <div className="h-0 md:h-[1000px]  bg-green-700 w-0 md:w-[7px]"></div>
          <div className='w:screen md:w-8/12'><ConversationPage /></div>
        </div>
      </div>
    </>
  )
}

export default Chat
