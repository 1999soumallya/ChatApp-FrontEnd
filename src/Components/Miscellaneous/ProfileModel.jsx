import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function ProfileModel({ user, children }) {

    const { isOpen, onClose, onOpen } = useDisclosure()


    return (
        <>
            {
                children ? (<span onClick={onOpen}>{children}</span>) : (
                    <IconButton icon={<ViewIcon />} display={{ base: "flex" }} onClick={onOpen} />
                )
            }

            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"} closeOnOverlayClick={false} closeOnEsc={false}>
                <ModalOverlay />
                <ModalContent h={"310px"} p={"10px"}>
                    <ModalHeader display={"flex"} fontSize={"40px"} fontFamily={"Work sans"} justifyContent={"center"}>{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
                        <Image src={user.picture} alt={user.name} boxSize={"150px"} borderRadius={"full"} />
                        <Text fontSize={{base: "28px", md: "25px"}} fontFamily={"Work sans"}> Email: {user.email} </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
