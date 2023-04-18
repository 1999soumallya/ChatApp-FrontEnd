import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate("/")
    }, [navigate])
    

    return (
        <div>
        </div>
    )
}
