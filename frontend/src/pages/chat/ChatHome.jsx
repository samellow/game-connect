import React from 'react'
import ChatSideBar from '../../components/chatSidebar/ChatSidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import { ProfileSidebar } from '../../components'
import './chat.css'
const ChatHome = () => {
  return (
    
<div className="chat-home">
  <ProfileSidebar></ProfileSidebar>
    <div className='  chat-container'>
			<ChatSideBar />
			<MessageContainer />
		</div>
</div>
    
      )
}

export default ChatHome