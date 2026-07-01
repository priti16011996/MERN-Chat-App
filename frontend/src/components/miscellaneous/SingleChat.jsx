import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
    Box,
    IconButton,
    Spinner,
    Text,
    Field,
    Input,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { FaEye } from "react-icons/fa";
import axios from "axios";

import { getSender, getSenderFull } from "../config/chatLogics";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ScrollableChat from "../ScrollableChat";
import { toaster } from "../ui/toaster";
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { user, selectedChat, setSelectedChat } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );

            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            setLoading(false);

            toaster.create({
                title: "Error Occurred",
                description:
                    error.response?.data?.message || "Failed to fetch messages",
                type: "error",
                closable: true,
            });
        }
    };
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []);
    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                //Give Notification
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        })
    })

    const sendMessage = async (e) => {
        if (e.key !== "Enter" || !newMessage.trim()) return;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const messageToSend = newMessage;
            setNewMessage("");

            const { data } = await axios.post(
                "/api/message",
                {
                    content: messageToSend,
                    chatId: selectedChat._id,
                },
                config
            );
            socket.emit("new message", data);
            setMessages((prev) => [...prev, data]);
        } catch (error) {
            toaster.create({
                title: "Error Occurred",
                description:
                    error.response?.data?.message || "Failed to send message",
                type: "error",
                closable: true,
            });
        }
    };



    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

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
                                <ProfileModel
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}

                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages}
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
                        flexDirection="column"
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        p={3}
                        overflow="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <Box
                                flex="1"
                                overflowY="auto"
                                mb={3}
                                px={1}
                            >
                                <ScrollableChat messages={messages} />
                            </Box>
                        )}

                        <Field.Root required>
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message..."
                                value={newMessage}
                                onChange={typingHandler}
                                onKeyDown={sendMessage}
                            />
                        </Field.Root>
                    </Box>
                </>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                >
                    <Text
                        fontSize="3xl"
                        pb={3}
                        fontFamily="Work Sans"
                    >
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
}

export default SingleChat;