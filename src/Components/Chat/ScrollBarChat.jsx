import { Avatar, Box, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { isLastMessage, isSameSender } from '../../Config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'

export default function ScrollBarChat({ Messages }) {

    const { user } = ChatState()

    return (
        <ScrollableFeed>
            {
                Messages && Messages.map((m, i) => (
                    <Box display={"flex"} key={m._id} mt={"2px"} alignItems={"center"} justifyContent={m.sender._id === user.id ? "end" : "start"}>
                        {
                            (isSameSender(Messages, m, i, user.id) || isLastMessage(Messages, i, user.id)) ? (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar mt={"7px"} mr={1} size={"sm"} cursor={"pointer"} name={m.sender.name} src={m.sender.picture} />
                                </Tooltip>
                            ) : (
                                    <Box w={"calc(100% - 881px)"}></Box>
                            )
                        }
                        <Text backgroundColor={m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"} borderRadius={"20px"} padding={"5px 15px"} maxW={"75%"}>{m.content}</Text>
                    </Box>
                ))
            }
        </ScrollableFeed>
    )
}
