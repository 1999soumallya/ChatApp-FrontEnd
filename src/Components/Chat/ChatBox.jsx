import React from 'react'
import { ChatState } from "../../Context/ChatProvider"
import { Box } from '@chakra-ui/react'
import SingleChat from '../Miscellaneous/SingleChat'

export default function ChatBox({ fetchAgain, setfetchAgain }) {

    const { SelectChat } = ChatState()

    return (
        <Box display={{ base: SelectChat ? "flex" : "none", md: "flex" }} alignItems={"center"} flexDir={"column"} p={3} bg={"white"} w={{ base: "100%", md: "68%" }} borderRadius={"lg"} borderWidth={"1px"}>
            <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        </Box>
    )
}
