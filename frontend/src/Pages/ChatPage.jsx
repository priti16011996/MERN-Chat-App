import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react';

function ChatPage() {
  let [chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/v1/chat");
      setChats(data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <ul>
      {chats.map((chat)=>(
        <li key={chat._id}>{chat.chatName}</li>
      ))}
      </ul>
    </div>
  )
}

export default ChatPage