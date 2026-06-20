import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowLeft } from "lucide-react";
import { getSender, getSenderFull } from '../config/chatLogics';
import ProfileModel from './ProfileModel';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { FaEye } from "react-icons/fa";

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState();
    console.log("setFetchAgain Chat:", setFetchAgain);
    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work Sans"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            variant="ghost"
                            aria-label="Back"
                            onClick={() => setSelectedChat("")}
                        >
                            <ArrowLeft />
                        </IconButton>
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>{selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                >
                                    <IconButton
                                        aria-label="Update Group"
                                        variant="ghost"
                                    >
                                        <FaEye />
                                    </IconButton>
                                </UpdateGroupChatModal>
                            </>
                        )}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {/* Message here */}
                    </Box>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat
