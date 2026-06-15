import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import { toaster } from "../ui/toaster";

function MyChats() {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            toaster.create({
                title: "Error occured!",
                description: "Failed to load the Chat result",
                type: "error",
                closable: true,
                duration: 5000,
                placement: "top-end"
            });
            return;
        }
    }
    return (
        <div>
            MyChats
        </div>
    )
}

export default MyChats
