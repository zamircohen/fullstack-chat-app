import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function login(username: string, password: string) {
        // e.preventDefault()
        const url = "http://localhost:3001/login"
        const payload = { username, password }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    navigate("/chats")
                }
                else if (data.error) {
                    alert("Wrong username or password")
    }
    })
    }
    
    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={(e) => login(username, password)}>Login</button>
        </div>
    )
}
