import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

function UserBadgeItem({ user, handleFunction }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            gap={2}
            px={3}
            py={1.5}
            borderRadius="full"
            bg="teal.500"
            color="white"
            fontSize="sm"
            fontWeight="medium"
            cursor="pointer"
            boxShadow="sm"
            transition="all 0.2s ease"
            _hover={{
                bg: "teal.600",
                transform: "translateY(-1px)",
                boxShadow: "md",
            }}
            onClick={handleFunction}
        >
            <Text>{user.name}</Text>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ color: "red.200" }}
            >
                <IoClose size={16} />
            </Box>
        </Box>
    );
}

export default UserBadgeItem;