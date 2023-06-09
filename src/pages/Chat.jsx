import React from 'react'
import ChatPage from '../components/Message/ChatPage'
import ConversationPage from '../components/Message/ConversationPage'
const Chat = () => {
  return (
    <>
      <div>
        <div className='md:flex bg-gradient-to-r from-teal-400 to-yellow-200 h-full w-screen md:m-0 rounded-lg'>
          <div className='w-2/5 m-auto'><ChatPage /></div>
          <div className="h-0 md:h-[1000px]  bg-green-700 w-0 md:w-[7px]"></div>
          <div className='w-3/5 m-auto'><ConversationPage /></div>
        </div>
      </div>
    </>
  )
}

export default Chat