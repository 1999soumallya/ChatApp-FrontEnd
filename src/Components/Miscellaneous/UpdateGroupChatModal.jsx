import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../Chat/UserBadgeItem'

export default function UpdateGroupChatModal({ fetchAgain, setfetchAgain }) {

    const { user, SelectChat, setSelectChat } = ChatState()

    const [GroupName, setGroupName] = useState(SelectChat.chatName)
    const [GroupUsers, setGroupUsers] = useState([])
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const handleRemove = (user) => {

    }

    const handleRename = () => {
        
    }

    return (
        <>
            <IconButton display={"flex"} icon={<ViewIcon />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={"35px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>{SelectChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
                            {
                                SelectChat.users.length > 0 && SelectChat.users.map((users) => (
                                    <UserBadgeItem key={users._id} users={users} handleFunction={() => handleRemove(users)} />
                                ))
                            }
                        </Box>
                        <FormControl display={"flex"}>
                            <Input placeholder='Chat name' mb={3} value={GroupName} onChange={(e) => setGroupName(e.target.value)} />
                            <Button variant={"solid"} colorScheme="teal" ml={1} onClick={handleRename} > Update </Button>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
