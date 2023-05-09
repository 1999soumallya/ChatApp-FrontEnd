import React, { useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchChatsAction } from '../../Redux/Action/ChatAction'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender } from '../../Config/ChatLogics'
import GroupChatModal from '../Miscellaneous/GroupChatModal'

export default function MyChats({ fetchAgain }) {
    const { user, SelectChat, setSelectChat, chats, setChats } = ChatState()

    const toast = useToast()
    const dispatch = useDispatch()

    const { loading, AllChats, error } = useSelector((state) => state.fetchChats)

    useEffect(() => {
        dispatch(FetchChatsAction())
    }, [dispatch, fetchAgain])


    useEffect(() => {
        if (AllChats) {
            setChats(AllChats)
        }
        if (error) {
            toast({ title: "Error occured!", description: error.message, status: "error", duration: 5000, isClosable: true, position: "bottom-left" })
        }
    }, [AllChats, error, setChats, toast])


    return (
        <Box display={{ base: SelectChat ? 'none' : "flex", md: "flex" }} flexDir={"column"} alignItems={"center"} p={3} bg={"white"} w={{ base: "100%", md: "31%" }} borderRadius={"lg"} borderWidth={"1px"}>
            <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily={"Work sans"} display={"flex"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                My Chats
                <GroupChatModal>
                    <Button display={"flex"} fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}> New Group Chat </Button>
                </GroupChatModal>
            </Box>
            <Box display={"flex"} flexDir={"column"} p={3} bg={"#F8F8F8"} w={"100%"} h={"100%"} borderRadius={"lg"} overflowY={"hidden"}>
                {
                    loading ? (
                        <ChatLoading />
                    ) : (
                        <Stack overflowY={"scroll"}>
                            {
                                chats.map((chat) => (
                                    <Box onClick={() => setSelectChat(chat)} cursor={"pointer"} bg={SelectChat === chat ? "#38B2AC" : "#E8E8E8"} color={SelectChat === chat ? "white" : "black"} px={3} py={2} borderRadius={"lg"} key={chat._id}>
                                        <Text>
                                            {
                                                !chat.isGroupChat ? getSender(user, chat.users) : chat.chatName
                                            }
                                        </Text>
                                    </Box>
                                ))
                            }
                        </Stack>
                    )
                }
            </Box>
        </Box>
    )
}
