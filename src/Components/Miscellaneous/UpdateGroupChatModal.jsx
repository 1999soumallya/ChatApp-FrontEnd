import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../Chat/UserBadgeItem'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserBySearchAction, RemoveGroupUserAction, RenameGroupAction } from '../../Redux/Action/ChatAction'
import UserListItem from '../Chat/UserListItem'

export default function UpdateGroupChatModal() {

    const { user, SelectChat, setSelectChat, setChats, chats } = ChatState()

    const [GroupName, setGroupName] = useState("")
    const [GroupUsers, setGroupUsers] = useState([])
    const [SearchResult, setSearchResult] = useState([])
    const [flag, setflag] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const dispatch = useDispatch()

    const { GroupRenameloading, GroupRename, GroupRenameError } = useSelector((state) => state.groupRename)
    const { GroupUserUpdate, GroupUserUpdateError } = useSelector((state) => state.removeUser)
    const { loading, users, error } = useSelector((state) => state.getUserBySearch)

    useEffect(() => {
        setGroupName(SelectChat.chatName)
    }, [SelectChat])


    useEffect(() => {
        if (GroupRename) {
            setSelectChat(GroupRename)
            setChats([GroupRename, ...chats.filter((items) => { return items._id !== GroupRename._id })])
            onClose()
        }

        if (GroupRenameError) {
            toast({ title: GroupRenameError.message, status: "error", isClosable: true, duration: 5000, position: "top-right" })
        }
    }, [GroupRename, GroupRenameError, chats, dispatch, onClose, setChats, setSelectChat, toast])

    useEffect(() => {
        if (GroupUserUpdate) {
            if (flag === true) {
                setSelectChat("")
                setChats([...chats.filter((items) => { return items._id !== GroupUserUpdate._id })])
            } else {
                setSelectChat(GroupUserUpdate)
                setChats([GroupUserUpdate, ...chats.filter((items) => { return items._id !== GroupUserUpdate._id })])
            }
            setflag(false)
        }
        if (GroupUserUpdateError) {
            toast({ title: "Error occured!", description: GroupUserUpdateError.message, duration: 5000, isClosable: true, position: "top-left" })
        }
    }, [GroupRename, GroupUserUpdate, GroupUserUpdateError, chats, flag, setChats, setSelectChat, toast])

    useEffect(() => {
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
    }, [SearchResult, error, toast, users])


    const handleRemove = (users) => {
        if (user.id === users._id) {
            return
        }
        dispatch(RemoveGroupUserAction(SelectChat._id, users._id))
    }

    const handleRename = (id) => {
        dispatch(RenameGroupAction(id, GroupName))
    }

    const handleSearch = (search) => {
        if (!search) {
            return
        }
        dispatch(GetUserBySearchAction(search))
    }

    const handleAddUserInGroup = (users) => {
        if (GroupUsers.includes(users) || SelectChat.users?.includes(users)) {
            toast({ title: "User already added", status: "warning", duration: 5000, isClosable: true, position: "top" })
            return
        }
        setGroupUsers([...GroupUsers, users])
    }

    const handleSubmit = (id) => {
        if (GroupName === "" || GroupUsers.length === 0) {
            toast({ title: "Please fill all the feilds", status: "warning", duration: 5000, isClosable: true, position: "top-right" })
            return
        }
        // dispatch(CreateGroupAction(GroupName, GroupUsers))
    }

    const handleDelete = (user) => {
        setGroupUsers(GroupUsers.filter((e) => e._id !== user._id))
    }

    const LeaveGroup = () => {
        dispatch(RemoveGroupUserAction(SelectChat._id, user.id))
        onClose()
        setflag(true)
    }

    return (
        <>
            <IconButton display={"flex"} icon={<ViewIcon />} onClick={onOpen} isRound />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={"35px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>{SelectChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} alignItems={"center"} flexDir={"column"}>
                        <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
                            {
                                SelectChat.users.length > 0 && SelectChat.users.filter((users) => { return users._id !== user.id }).map((users) => (
                                    <UserBadgeItem key={users._id} users={users} handleFunction={() => handleRemove(users)} />
                                ))
                            }
                            {
                                GroupUsers.length > 0 && GroupUsers.map((users) => (
                                    <UserBadgeItem key={users._id} users={users} handleFunction={() => handleDelete(users)} />
                                ))
                            }
                        </Box>
                        <FormControl display={"flex"}>
                            <Input placeholder='Chat name' mb={3} value={GroupName} onChange={(e) => setGroupName(e.target.value)} />
                            <Button variant={"solid"} isLoading={GroupRenameloading} colorScheme="teal" ml={1} onClick={() => handleRename(SelectChat._id)} > Update </Button>
                        </FormControl>
                        <FormControl display={"flex"}>
                            <Input placeholder="Add Users eg: John, Piyush, Jane" name='groupUsers' mb={2} onChange={(e) => handleSearch(e.target.value)} />
                            <Button variant={"solid"} isLoading={GroupRenameloading} colorScheme="teal" ml={1} onClick={() => handleSubmit(SelectChat._id)} > Add </Button>
                        </FormControl>
                        {
                            loading ? (<>Loading</>) : (Array.isArray(SearchResult) === true) ? SearchResult?.slice(0, 3).map((items) => (
                                <UserListItem user={items} key={items._id} handleFunction={() => handleAddUserInGroup(items)} />
                            )) : (<Text color={"red"} colorScheme="red" fontSize={"14px"} fontWeight={"medium"} fontFamily={"Work sans"}>{SearchResult}</Text>)
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={1} onClick={LeaveGroup}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
