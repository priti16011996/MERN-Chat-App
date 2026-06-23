import React, { useEffect, useRef } from "react";
import { Box, Image } from "@chakra-ui/react";

import {
    isSameSender,
    isLastMessage,
    isSameSenderMargin,
} from "./config/chatLogics";

import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages = [] }) => {
    const { user } = ChatState();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <>
            {messages.map((m, i) => (
                <Box
                    key={m._id}
                    display="flex"
                    alignItems="center"
                >
                    {(isSameSender(messages, m, i, user?._id) ||
                        isLastMessage(messages, i, user?._id)) && (
                            <Image
                                src={m.sender?.pic}
                                alt={m.sender?.name}
                                boxSize="35px"
                                borderRadius="full"
                                mr="4px"
                                mt="7px"
                            />
                        )}

                    <Box
                        bg={
                            m.sender?._id === user?._id
                                ? "#BEE3F8"
                                : "#B9F5D0"
                        }
                        borderRadius="20px"
                        px="15px"
                        py="5px"
                        maxW="75%"
                        ml={isSameSenderMargin(
                            messages,
                            m,
                            i,
                            user?._id
                        )}
                        mt={
                            isSameSender(
                                messages,
                                m,
                                i,
                                user?._id
                            )
                                ? "3px"
                                : "10px"
                        }
                    >
                        {m.content}
                    </Box>
                </Box>
            ))}

            <div ref={messagesEndRef} />
        </>
    );
};

export default ScrollableChat;