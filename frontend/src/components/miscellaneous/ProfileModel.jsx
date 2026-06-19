import React from "react";
import {
    Dialog,
    Portal,
    IconButton,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function ProfileModel({ user, children }) {
    return (
        <Dialog.Root placement="center" size="md">
            <Dialog.Trigger asChild>
                {children ? (
                    <span style={{ cursor: "pointer" }}>
                        {children}
                    </span>
                ) : (
                    <IconButton
                        aria-label="View Profile"
                        variant="ghost"
                    >
                        <FaEye />
                    </IconButton>
                )}
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content
                        maxW="500px"
                        p={4}
                        borderRadius="lg"
                    >
                        {/* Close Icon */}
                        <Dialog.CloseTrigger asChild>
                            <IconButton
                                aria-label="Close"
                                variant="ghost"
                                size="sm"
                                position="absolute"
                                top="3"
                                right="3"
                            >
                                <IoClose size={22} />
                            </IconButton>
                        </Dialog.CloseTrigger>

                        {/* Header */}
                        <Dialog.Header justifyContent="center">
                            <Dialog.Title
                                fontSize={{ base: "2xl", md: "3xl" }}
                                fontFamily="Work Sans"
                                textAlign="center"
                                w="100%"
                            >
                                {user?.name}
                            </Dialog.Title>
                        </Dialog.Header>

                        {/* Body */}
                        <Dialog.Body>
                            <VStack gap={6}>
                                <Image
                                    borderRadius="full"
                                    boxSize="180px"
                                    objectFit="cover"
                                    src={user?.pic}
                                    alt={user?.name}
                                />

                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    fontFamily="Work Sans"
                                    textAlign="center"
                                >
                                    Email: {user?.email}
                                </Text>
                            </VStack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default ProfileModel;