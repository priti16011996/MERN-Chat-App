import React, { useState } from "react";
import {
    Button,
    CloseButton,
    Dialog,
    Portal,
    IconButton,
    Field,
    Input,
    Box,
    Spinner
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
import { toaster } from "../ui/toaster";
import UserBadgeItem from "../userAvtar/UserBadgeItem";
import { config } from "dotenv";
import axios from "axios";
import UserListItem from "../userAvtar/UserListItem";

const UpdateGroupChatModal = ({ children, fetchAgain, setFetchAgain }) => {
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toaster.create({
                title: "Only admins can remove someone!",
                type: "error",
                closable: true,
                duration: 5000,
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                "/api/chat/groupremove",
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toaster.create({
                title: "Error Occurred!",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
                closable: true,
                duration: 5000,
            });
            setLoading(false);
        }
    }
    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toaster.create({
                title: "User Already in group!",
                type: "error",
                closable: true,
                duration: 5000,
            });
            return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toaster.create({
                title: "Only admins can add someone!",
                type: "error",
                closable: true,
                duration: 5000,
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                "/api/chat/groupadd",
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);


        } catch (error) {
            toaster.create({
                title: "Error Occurred!",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
                closable: true,
                duration: 5000,
            });
            setLoading(false);
        }
    }
    const handleRename = async () => {
        if (!groupChatName) {
            toaster.create({
                title: "Group Chat Name Can't be empty",
                type: "warning",
                closable: true,
                duration: 5000,
            });
            return;
        }
        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                "/api/chat/rename",
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
            setGroupChatName("");

        } catch (error) {
            console.log("Full Error:", error);
            console.log("Response Data:", error.response?.data);

            toaster.create({
                title: "Error Occurred!",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
                closable: true,
                duration: 5000,
            });

            setRenameLoading(false);
            setGroupChatName("");
        }

    }

    const handleSearch = async (query) => {
        setSearch(query);

        if (!query) return;

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/user?search=${search}`,
                config
            );

            setSearchResult(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);

            toaster.create({
                title: "Please Enter the Valid Value for Search",
                type: "warning",
                closable: true,
                duration: 5000,
                placement: "top-start"
            });
        }
    };
    return (
        <Dialog.Root size="md" placement="center">
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title
                                fontSize="35px"
                                fontFamily="Work sans"
                                display="flex"
                                justifyContent="center"
                            >
                                {selectedChat.chatName}
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            {/* Users */}
                            <Box w="100%" display="flex" flexWrap="wrap" gap={2} pb={3}>
                                {selectedChat.users.map((u) => (
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleRemove(u)}
                                    />
                                ))}
                            </Box>

                            {/* Rename Group */}
                            <Box display="flex" gap={2} mb={3}>
                                <Input
                                    placeholder="Chat Name"
                                    value={groupChatName}
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />

                                <Button
                                    colorPalette="blue"
                                    loading={renameLoading}
                                    onClick={handleRename}
                                >
                                    Update
                                </Button>
                            </Box>

                            {/* Search User */}
                            <Input
                                placeholder="Add user to group"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                            {
                                loading ? (
                                    <Spinner size="lg" />
                                ) : (
                                    searchResult?.map((user) => (
                                        <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
                                    ))
                                )}
                        </Dialog.Body>

                        <Dialog.Footer justifyContent="flex-end">
                            <Button
                                colorPalette="red"
                                onClick={() => handleRemove(user)}
                            >
                                Leave Group
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default UpdateGroupChatModal;