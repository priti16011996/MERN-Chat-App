import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

function ChatBox({ fetchAgain, setFetchAgain }) {
    const { selectedChat } = ChatState();
    console.log("setFetchAgain Chat Box:", setFetchAgain);
    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            aligItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox
