import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e: any) {
    e.preventDefault();

    const payload = {
      username,
      password,
    };
    const url = "http://localhost:3001/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    navigate("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <br />
          Create account
        </div>
        <form onSubmit={handleOnSubmit}>
          {/* Username:  */}
          <input
            type="text"
            placeholder="Create username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {/* Password:  */}
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign up</button>
        </form>
        <div className="Bottom_Field">
          <button onClick={() => navigate("/")}>Back to login</button>
        </div>
      </header>
    </div>
  );
}
