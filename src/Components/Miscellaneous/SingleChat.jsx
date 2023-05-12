import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, InputGroup, InputRightElement, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon, ChevronRightIcon, DeleteIcon } from '@chakra-ui/icons'
import { getSender, getSenderDetails } from '../../Config/ChatLogics'
import ProfileModel from './ProfileModel'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteChatAction } from '../../Redux/Action/ChatAction'

export default function SingleChat() {

    const [Message, setMessage] = useState([])
    const [Loading, setLoading] = useState(false)
    const [newMessage, setnewMessage] = useState()

    const { user, SelectChat, setSelectChat, chats, setChats } = ChatState()

    const dispatch = useDispatch()
    const { DeleteLoading, Delete, DeleteError } = useSelector((state) => state.deleteChat)
    const toast = useToast()

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

    const sendMessage = () => {

    }

    const typingHandaler = (e) => {
        setnewMessage(e)

        // Typing Indicator Logic
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
                                        <UpdateGroupChatModal />
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
                                    <div>

                                    </div>
                                )
                            }
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
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
