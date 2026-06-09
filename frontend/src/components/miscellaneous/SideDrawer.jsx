import { Box, Text } from '@chakra-ui/react';
import { Menu, MenuButton, Tooltip, Button, Avatar } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';

function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    return (
        <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
            <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
                <Button variant="ghost">
                    <i class="fas fa-search"></i>
                    <Text d={{ base: "none", md: "flex" }} px="4">
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text fontSie="2xl" fontFamily="Work sans" >
                Talk-A-Tive
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize="2xl" m={1} />
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size="sm" cursor="pointer" name={UserActivation.name} />
                    </MenuButton>
                </Menu>
            </div>
        </Box>
    )
}

export default SideDrawer
