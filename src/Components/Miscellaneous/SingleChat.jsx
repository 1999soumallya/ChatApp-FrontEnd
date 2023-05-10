import React, { useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'
import { getSender, getSenderDetails } from '../../Config/ChatLogics'
import ProfileModel from './ProfileModel'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteChatAction } from '../../Redux/Action/ChatAction'

export default function SingleChat() {

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
