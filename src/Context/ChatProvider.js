import { useNavigate } from "react-router-dom";
import { Dcrypt } from "../SequrityFunction";
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [SelectChat, setSelectChat] = useState()
    const [chats, setChats] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("userInfo")) {
            setUser(JSON.parse(Dcrypt(localStorage.getItem("userInfo"))))
        }
        let token = localStorage.getItem("Authtoken")
        if (!token) {
            navigate("/")
        }

        if (sessionStorage.getItem("loginemail")) {
            navigate("/forgot_password")
        }

    }, [navigate])


    return (
        <ChatContext.Provider value={{ user, setUser, SelectChat, setSelectChat, chats, setChats }}>{children}</ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider