import React, { useState } from "react";
import {
    Button,
    CloseButton,
    Dialog,
    Portal,
    IconButton,
    Field,
    Input,
    Box
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
import { toaster } from "../ui/toaster";
import UserBadgeItem from "../userAvtar/UserBadgeItem";

const UpdateGroupChatModal = ({ children, fetchAgain, setFetchAgain }) => {
    const [groupChatName, setGroupChatName] = useState();
    const [search, setsearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleRemove = () => {

    }

    const handleRename = () => {

    }

    const handleSearch = () => {

    }
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
                                    setsearch(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
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