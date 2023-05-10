import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderDetails } from '../../Config/ChatLogics'
import ProfileModel from './ProfileModel'
import UpdateGroupChatModal from './UpdateGroupChatModal'

export default function SingleChat({ fetchAgain, setfetchAgain }) {

    const { user, SelectChat, setSelectChat } = ChatState()

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
                                    <UpdateGroupChatModal fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
                                </>
                            ) : (
                                <>
                                    {getSender(user, SelectChat.users)}
                                    <ProfileModel user={getSenderDetails(user, SelectChat.users) } />
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