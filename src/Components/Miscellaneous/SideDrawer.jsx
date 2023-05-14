import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutAction } from '../../Redux/Action/UserAction'
import { AccessChatByIdAction, ClearUserSearchAction, GetUserBySearchAction } from '../../Redux/Action/ChatAction'
import ChatLoading from '../Chat/ChatLoading'
import UserListItem from '../Chat/UserListItem'
import { getSender } from '../../Config/ChatLogics'
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge"
import { Effect } from "react-notification-badge"
import { DeleteAllNotificationAction, GetNotificationAction } from '../../Redux/Action/NotificationAction'

export default function SideDrawer() {

    const [Search, setSearch] = useState("")
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(false)
    const [LoadingChat, setLoadingChat] = useState()

    const { user, setSelectChat, chats, setChats, Notification, setNotification } = ChatState()
    const nevigate = useNavigate()
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const toast = useToast()

    const { loading, users, error } = useSelector((state) => state.getUserBySearch)
    const { AccessChatloading, Accesschats, AccessChaterror } = useSelector((state) => state.accessChatById)
    const { notifications, notificationserror } = useSelector((state) => state.getNotification)
    const { DeleteAllnotifications, DeleteAllnotificationserror } = useSelector((state) => state.deleteAllNotification)
    // const { } = useSelector((state) => state)

    useEffect(() => {
        dispatch(GetNotificationAction(user.id))
    }, [dispatch, user, DeleteAllnotifications])

    useEffect(() => {
        if (notificationserror) {
            toast({ position: "top-right", status: "error", title: notificationserror.message, isClosable: true, duration: 5000 })
        }
    }, [notificationserror, toast])

    useEffect(() => {
        if (DeleteAllnotificationserror) {
            toast({ position: "top-right", status: "error", title: DeleteAllnotificationserror.message, isClosable: true, duration: 5000 })
        }
    }, [DeleteAllnotificationserror, toast])

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

    const loagoutHandlar = () => {
        dispatch(LogoutAction())
        nevigate("/")
    }

    const handleSearch = () => {
        setSearchResult([])
        if (Search === "") {
            toast({ title: "Please enter something in search", status: "warning", duration: 5000, isClosable: true, position: "top-left" })
            return
        }
        dispatch(GetUserBySearchAction(Search))
    }

    const accessChat = (userId) => {
        dispatch(AccessChatByIdAction(userId))
    }

    const handleClose = useCallback(() => {
        setSearch("")
        dispatch(ClearUserSearchAction())
        setSearchResult([])
    }, [dispatch])

    useEffect(() => {
        setLoadingChat(AccessChatloading)
        if (Accesschats) {
            if (!chats.find((items) => items._id === Accesschats._id)) setChats([Accesschats, ...chats])
            setSelectChat(Accesschats)
            onClose()
            handleClose()
        }
        if (AccessChaterror) {
            toast({ title: "Error occured!", description: AccessChaterror.message, status: "error", duration: 5000, isClosable: true, position: "bottom-left" })
        }
    }, [AccessChaterror, AccessChatloading, Accesschats, chats, handleClose, onClose, setChats, setSelectChat, toast])

    const handleNotificationDeleteForASingleChat = (chat) => {
        dispatch(DeleteAllNotificationAction(chat._id))
        setSelectChat(chat)
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} bg={"white"} w={"100%"} p={"5px 10px 5px 10px"} borderWidth={"5px"}>
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant={"ghost"} ref={btnRef} onClick={onOpen}>
                        <FontAwesomeIcon icon={faSearch} beatFade style={{ color: "#00fdff", }} />
                        <Text display={{ base: "none", md: "flex" }} px={"4"}>Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize={"2xl"} fontFamily={"Work sans"}>
                    Talk-A-Tive
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge count={notifications.length} effect={Effect.SCALE} />
                            <BellIcon fontSize={"2xl"} m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                            {
                                !notifications?.length && "No New Messages"
                            }
                            {
                                notifications?.map((notif) => (
                                    <MenuItem key={notif._id} onClick={() => handleNotificationDeleteForASingleChat(notif.notificationMessages.chat)}>
                                        {notif.notificationMessages.chat.isGroupChat ? `New Message in ${notif.notificationMessages.chat.chatName}` : `New Message from ${getSender(user, notif.notificationMessages.chat.users)}`}
                                    </MenuItem>
                                ))
                            }
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.picture} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem> My Profile </MenuItem>
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={loagoutHandlar}> Logout </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef} closeOnOverlayClick={false} closeOnEsc={false}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={handleClose} />
                    <DrawerHeader borderBottomWidth={"1px"}> Search Users </DrawerHeader>
                    <DrawerBody>
                        <Box display={"flex"} pb={2}>
                            <Input placeholder='Search by name or email' mr={2} value={Search} onChange={(e) => setSearch(e.target.value)} />
                            <Button variant={"solid"} colorScheme="blue" onClick={handleSearch} > Go </Button>
                        </Box>
                        {
                            Loading ? (
                                <ChatLoading />
                            ) : (Array.isArray(SearchResult) === true) ? (
                                SearchResult?.map((users) => (
                                    <UserListItem key={users._id} user={users} handleFunction={() => accessChat(users._id)} />
                                ))
                            ) : (<Text color={"red"} colorScheme="red" fontSize={"14px"} fontWeight={"medium"} fontFamily={"Work sans"}>{SearchResult}</Text>)
                        }
                        {LoadingChat && <Spinner ml={"auto"} display={"flex"} />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>

    )
}
