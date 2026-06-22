import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Spinner, Text, Field, Input } from '@chakra-ui/react';
import { ArrowLeft } from "lucide-react";
import { getSender, getSenderFull } from '../config/chatLogics';
import ProfileModel from './ProfileModel';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { FaEye } from "react-icons/fa";
import { toaster } from "../ui/toaster";
import axios from "axios";

function SingleChat({ fetchAgain, setFetchAgain }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const { user, selectedChat, setSelectedChat } = ChatState();
    //console.log("setFetchAgain Chat:", setFetchAgain);
    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            setLoading(true);
            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            console.log(data);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toaster.create({
                title: "Error Occured",
                description: error.response?.data?.message || "Failed to fetch messages",
                type: "error",
                closable: true,
                duration: 5000,
            });
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [selectedChat])
    const sendMessage = async (event) => {
        if (event.key == "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                setNewMessage("");
                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                console.log(data);
                setMessages([...messages, data]);

            } catch (error) {
                console.log(error);
                toaster.create({
                    title: "Error Occured",
                    description: error.response?.data?.message || "Failed to send the Messages",
                    type: "error",
                    closable: true,
                    duration: 5000,
                });
            }
        }
    };

    const typingHandler = (event) => {
        setNewMessage(event.target.value);
        //Typing Indicator logic 
    }
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
                        {loading ? (
                            <Spinner size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto" />
                        ) : (
                            <div> {/*Messages */} </div>
                        )}
                        <Field.Root onKeyDown={sendMessage} required mt={3}>
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder='Enter a message...'
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </Field.Root>
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
