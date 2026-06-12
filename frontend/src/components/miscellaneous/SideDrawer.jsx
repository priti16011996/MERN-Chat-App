import React, { useState } from "react";
import { Box, Text, Button, Menu } from "@chakra-ui/react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";


function SideDrawer() {
    const { user } = ChatState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="10px"
            borderBottom="1px solid"
        >
            <Button variant="ghost">
                <FaSearch />
                <Text ml={2}>Search User</Text>
            </Button>

            <Text fontSize="2xl" fontWeight="bold">
                Talk-A-Tive
            </Text>

            <Box display="flex" alignItems="center" gap={4}>
                {/* Notification Menu */}
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button variant="ghost">
                            <FaBell size={20} />
                        </Button>
                    </Menu.Trigger>

                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="notifications">
                                No New Notifications
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Menu.Root>

                {/* User Menu */}
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button variant="ghost">
                            <Box
                                w="32px"
                                h="32px"
                                borderRadius="full"
                                bg="gray.300"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </Box>

                            <FaChevronDown style={{ marginLeft: "8px" }} />
                        </Button>
                    </Menu.Trigger>

                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="profile" user={user} asChild>
                                <ProfileModel />
                            </Menu.Item>

                            <Menu.Item value="logout" onClick={logoutHandler}>
                                Logout
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Menu.Root>
            </Box>
        </Box>
    );
}

export default SideDrawer;