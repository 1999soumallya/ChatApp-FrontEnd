import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { CreateGroupAction, GetUserBySearchAction } from '../../Redux/Action/ChatAction'
import UserListItem from '../Chat/UserListItem'
import UserBadgeItem from '../Chat/UserBadgeItem'
import { ChatState } from '../../Context/ChatProvider'

export default function GroupChatModal({ children }) {

    const [GroupName, setGroupName] = useState("")
    const [GroupUsers, setGroupUsers] = useState([])
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(false)

    const toast = useToast()
    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { chats, setChats } = ChatState()

    const { loading, users, error } = useSelector((state) => state.getUserBySearch)
    const { CreateGroup, CreateGroupError } = useSelector((state) => state.createGroup)

    useEffect(() => {
        setLoading(loading)
        if (users) {
            if (users.users?.length > 0) {
                setSearchResult(users.users)
            } else {
                setSearchResult(users.message)
            }
        }
        if (error) {
            toast({ title: "Error occured!", description: error.message, status: "error", duration: 5000, isClosable: true, position: "bottom-left" })
        }
    }, [SearchResult, error, loading, toast, users])

    useEffect(() => {
        if (CreateGroup) {
            setChats([...CreateGroup, ...chats])
            onClose()
            toast({ title: "New Group Chat Created!", status: "success", duration: 5000, isClosable: true, position: "bottom-left" })
        }

        if (CreateGroupError) {
            toast({ title: "Failed to create the chat!", description: CreateGroupError.message, status: "error", duration: 5000, isClosable: true, position: "top-right" })
        }

    }, [CreateGroup, CreateGroupError, toast])


    const handleSearch = (search) => {
        if (!search) {
            return
        }
        dispatch(GetUserBySearchAction(search))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (GroupName === "" || GroupUsers.length === 0) {
            toast({ title: "Please fill all the feilds", status: "warning", duration: 5000, isClosable: true, position: "top-right" })
            return
        }
        dispatch(CreateGroupAction(GroupName, GroupUsers))
    }

    const handleAddUserInGroup = (users) => {
        if (GroupUsers.includes(users)) {
            toast({ title: "User already added", status: "warning", duration: 5000, isClosable: true, position: "top" })
            return
        }
        setGroupUsers([...GroupUsers, users])
    }

    const handleDelete = (user) => {
        setGroupUsers(GroupUsers.filter((e) => e._id !== user._id))
    }


    return (
        <>
            {
                children && (<span onClick={onOpen}> {children} </span>)
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={"35px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} alignItems={"center"} flexDir={"column"}>
                        <FormControl>
                            <Input placeholder="Chat Name" name='groupName' mb={3} value={GroupName} onChange={(e) => setGroupName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder="Add Users eg: John, Piyush, Jane" name='groupUsers' mb={1} onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        {/* selected users */}
                        <Box w={"100%"} display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
                            {
                                GroupUsers.length > 0 && GroupUsers.map((users) => (
                                    <UserBadgeItem key={users._id} users={users} handleFunction={() => handleDelete(users)} />
                                ))
                            }
                        </Box>
                        {/* Rander searched users */}
                        {
                            Loading ? (<>Loading</>) : (Array.isArray(SearchResult) === true) ? SearchResult?.slice(0, 4).map((items) => (
                                <UserListItem user={items} key={items._id} handleFunction={() => handleAddUserInGroup(items)} />
                            )) : (<Text color={"red"} colorScheme="red" fontSize={"14px"} fontWeight={"medium"} fontFamily={"Work sans"}>{SearchResult}</Text>)
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
