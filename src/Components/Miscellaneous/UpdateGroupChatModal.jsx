import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../Chat/UserBadgeItem'
import { useDispatch, useSelector } from 'react-redux'
import { FetchChatsAction, RenameGroupAction } from '../../Redux/Action/ChatAction'

export default function UpdateGroupChatModal({ fetchAgain, setfetchAgain }) {

    const { user, SelectChat, setSelectChat, setChats } = ChatState()

    const [GroupName, setGroupName] = useState("")
    const [GroupUsers, setGroupUsers] = useState([])
    const [SearchResult, setSearchResult] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const dispatch = useDispatch()

    const { GroupRenameloading, GroupRename, GroupRenameError } = useSelector((state) => state.groupRename)
    const { AllChats, error } = useSelector((state) => state.fetchChats)

    useEffect(() => {
        setGroupName(SelectChat.chatName)
    }, [SelectChat.chatName])

    useEffect(() => {
        if (GroupRename) {
            dispatch(FetchChatsAction())
        }

        if (GroupRenameError) {
            toast({ title: GroupRenameError.message, status: "error", isClosable: true, duration: 5000, position: "top-right" })
        }
    }, [GroupRename, GroupRenameError, dispatch, toast])

    useEffect(() => {
        if (AllChats) {
            setChats(AllChats)
            onClose()
        }
        if (error) {
            toast({ title: "Error occured!", description: error.message, status: "error", duration: 5000, isClosable: true, position: "bottom-left" })
        }
    }, [AllChats, error, onClose, setChats, toast])

    const handleRemove = (user) => {

    }

    const handleRename = (id) => {
        dispatch(RenameGroupAction(id, GroupName))
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
                            <Button variant={"solid"} isLoading={GroupRenameloading} colorScheme="teal" ml={1} onClick={() => handleRename(SelectChat._id)} > Update </Button>
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
