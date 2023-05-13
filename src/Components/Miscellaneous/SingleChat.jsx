/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, InputGroup, InputRightElement, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon, ChevronRightIcon, DeleteIcon } from '@chakra-ui/icons'
import { getSender, getSenderDetails } from '../../Config/ChatLogics'
import ProfileModel from './ProfileModel'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { useDispatch, useSelector } from 'react-redux'
import { CreateSingleChatMessageAction, DeleteChatAction, GetSingleChatMessageAction } from '../../Redux/Action/ChatAction'
import '../../Css/style.css'
import ScrollBarChat from '../Chat/ScrollBarChat'
import { io } from 'socket.io-client'
import Lottie from 'react-lottie'
import * as animationData from '../../Animation/typing.json'

var socket, selectedChatCompare;

export default function SingleChat() {
    const [Loading, setLoading] = useState(false)
    const [Messages, setMessages] = useState([])
    const [newMessage, setnewMessage] = useState()
    const [SocketConnected, setSocketConnected] = useState(false)
    const [Typing, setTyping] = useState(false)
    const [IsTyping, setIsTyping] = useState(false)

    const { user, SelectChat, setSelectChat, chats, setChats } = ChatState()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const dispatch = useDispatch()
    const { DeleteLoading, Delete, DeleteError } = useSelector((state) => state.deleteChat)
    const { loading, messages, error } = useSelector((state) => state.allMessages)
    const { Createmessages, Createmessageserror } = useSelector((state) => state.createMessage)
    const toast = useToast()

    useEffect(() => {
        socket = io(process.env.REACT_APP_API_URL)
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
    }, [])

    useEffect(() => {
        socket.on("message recive", (newMessageRecived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecived.chat._id) {
                // Give Me Th Notification
            } else {
                setMessages([...Messages, newMessageRecived])
            }

        })
    })

    const FetchMessages = useCallback(() => {
        dispatch(GetSingleChatMessageAction(SelectChat._id))
        socket.emit("join chat", SelectChat._id)
    }, [SelectChat, dispatch])

    useEffect(() => {
        if (SelectChat) {
            FetchMessages()
            selectedChatCompare = SelectChat
        }
    }, [FetchMessages, SelectChat])

    useEffect(() => {
        setLoading(loading)
        if (messages) {
            setMessages(messages)
        }
        if (error) {
            toast({ title: "Error occure!", description: error.message, duration: 5000, isClosable: true, position: "top-right" })
        }
    }, [error, loading, messages, toast])


    useEffect(() => {
        if (Createmessages) {
            socket.emit("new message", Createmessages)
            setMessages([...Messages, Createmessages])
        }
        if (Createmessageserror) {
            toast({ title: "Error occure!", description: Createmessageserror.message, duration: 5000, isClosable: true, position: "top-right" })
        }
    }, [Createmessages, Createmessageserror, toast])

    useEffect(() => {
        if (Delete) {
            setSelectChat("")
            toast({ title: Delete.message, status: "success", duration: 5000, isClosable: true, position: "top-right" })
        }
        if (DeleteError) {
            toast({ title: DeleteError.message, status: "error", duration: 5000, isClosable: true, position: "top-right" })
        }
    }, [Delete, DeleteError, setSelectChat, toast])


    const DeleteChat = (id) => {
        if (window.confirm("Are you sure to delete this chat")) {
            dispatch(DeleteChatAction(id))
            setChats([...chats.filter((items) => { return items._id !== id })])
        }
    }

    const sendMessage = (e) => {
        if ((e.key === "Enter") || (e._reactName === "onClick")) {
            socket.emit("stop typing", SelectChat._id)
            dispatch(CreateSingleChatMessageAction(SelectChat._id, newMessage))
            setnewMessage("")
        }
    }

    const typingHandaler = (e) => {
        setnewMessage(e)
        if (!SocketConnected) return;
        if (!Typing) {
            setTyping(true)
            socket.emit("typing", SelectChat._id)
        }
        let lastTypingTime = new Date().getTime()
        setTimeout(() => {
            let now = new Date().getTime()
            let timeDff = now - lastTypingTime
            if (timeDff >= 3000 && Typing) {
                socket.emit("stop typing", SelectChat._id)
                setTyping(false)
            }
        }, 3000);
    }

    return (
        <>
            {
                SelectChat ? (
                    <>
                        <Text fontSize={{ base: "28px", md: "30px" }} pb={3} px={2} w={"100%"} fontFamily={"Work sans"} display={"flex"} justifyContent={{ base: "space-between" }} alignItems={"center"}>
                            <IconButton display={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />} onClick={() => setSelectChat("")} />
                            {SelectChat.isGroupChat ? (
                                <>
                                    {SelectChat.chatName.toUpperCase()}
                                    <Box display={"flex"} justifyContent={"space-around"} w={"10%"}>
                                        {SelectChat.groupAdmin._id === user.id && (<IconButton isLoading={DeleteLoading} isRound display={"flex"} icon={<DeleteIcon />} colorScheme="red" onClick={() => DeleteChat(SelectChat._id)} />)}
                                        <UpdateGroupChatModal FetchMessages={FetchMessages} />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    {getSender(user, SelectChat.users)}
                                    <Box display={"flex"} justifyContent={"space-around"} w={"10%"}>
                                        <IconButton isLoading={DeleteLoading} isRound display={"flex"} icon={<DeleteIcon />} colorScheme="red" onClick={() => DeleteChat(SelectChat._id)} />
                                        <ProfileModel user={getSenderDetails(user, SelectChat.users)} />
                                    </Box>
                                </>
                            )}
                        </Text>
                        <Box display={"flex"} flexDir={"column"} justifyContent={"flex-end"} p={3} bg={"#E8E8E8"} w={"100%"} h={"100%"} borderRadius={"lg"} overflowY={"hidden"}>
                            {
                                Loading ? (
                                    <Spinner size={"xl"} w={20} h={20} alignSelf={"center"} margin={"auto"} />
                                ) : (
                                    <div className='messages'>
                                        <ScrollBarChat Messages={Messages} />
                                    </div>
                                )
                            }
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                                {
                                    IsTyping ? (
                                        <div>
                                            <Lottie options={defaultOptions} width={70} style={{ marginBottom: 15, marginLeft: 0 }} />
                                        </div>
                                    ) : (<></>)
                                }
                                <InputGroup overflow={"hidden"}>
                                    <Input variant={"filled"} borderRadius={20} bg={"#E0E0E0"} placeholder='Enter a message...' onChange={(e) => typingHandaler(e.target.value)} value={newMessage} />
                                    <InputRightElement><IconButton colorScheme="blue" icon={<ChevronRightIcon />} isRound p={"2px"} onClick={sendMessage} /></InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Box>
                    </>
                ) : (
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100%"}>
                        <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
                            Click on a user to start chat
                        </Text>
                    </Box>
                )
            }
        </>
    )
}
