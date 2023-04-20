import { useNavigate } from "react-router-dom";
import { Dcrypt } from "../SequrityFunction";

const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState()
    
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("userInfo")) {
            setUser(JSON.parse(Dcrypt(localStorage.getItem("userInfo"))))
        }
        let token = localStorage.getItem("Authtoken")
        if (!token) {
            navigate("/")
        }

    }, [navigate])


    return (
        <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider