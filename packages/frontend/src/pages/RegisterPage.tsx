import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function SignupPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleOnSubmit(e: any){
        e.preventDefault()
        
        const payload = {
            username,
            password,
        }
        const url = "http://localhost:3001/create"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        navigate("/")    
    }


  return (
    <div>
        <h1>Create account</h1>
        <form onSubmit={handleOnSubmit}>
                Username: <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /> <br />
                Password: <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> <br />
                <button type="submit">Sign up</button>
           </form>
           <br />
           <a href="/">Back to login</a>
    </div>
  )
}
