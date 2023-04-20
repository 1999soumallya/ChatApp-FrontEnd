import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../Components/Miscellaneous/SideDrawer'
import MyChats from '../Components/Chat/MyChats'
import ChatBox from '../Components/Chat/ChatBox'

export default function ChatPage() {

    const { user } = ChatState()


    return (
        <div style={{ "width": "100%", "textAlign": "left" }}>
            {user && <SideDrawer />}
            <Box display={"flex"} justifyContent={"space-between"} w={"100%"} h={"91.5vh"} p={"10px"}>
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}
