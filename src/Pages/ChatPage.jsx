import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ChatPage() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("Authtoken")) {
            navigate("/")
        }
    }, [navigate])


    return (
        <div>
            This is my chat page
        </div>
    )
}
