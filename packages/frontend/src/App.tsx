import React, { useEffect, useState, useRef } from "react";
import ChatItem from "../../shared/src/chat-item";
import "./App.css";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import './darkMode.css';

axios.defaults.baseURL =
  process.env.REACT_APP_CHAT_API || "http://localhost:4000";

const fetchChats = async (): Promise<ChatItem[]> => {
  const response = await axios.get<ChatItem[]>("/chats");
  return response.data;
};

function App() {
  const [chatText, setChatText] = useState<string>("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [chatUser, setChatUser] = useState<string>("");

  const [theme, setTheme] = useState<string>("light");
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const bottomRef = useRef<null | HTMLDivElement>(null);

  const createChat = async (
    chatText: string,
    chatUser: string
  ): Promise<void> => {
    const chatItem: ChatItem = {
      user: chatUser,
      text: chatText,
      timeStamp: new Date(),
    };

    try {
      await axios.post<ChatItem[]>("/chats", chatItem);
      const response = await axios.get<ChatItem[]>("/chats");
      setChats(response.data);
      setChatText("");
      setChatUser("");
    } catch (err) {
      setChats([]);
      setError("Error creating chat");
    }
  };

  const deleteChat = async (chat: ChatItem): Promise<void> => {
    try {
      await axios.delete<ChatItem[]>(`/chats/${chat._id}`);
      const response = await axios.get<ChatItem[]>("/chats");
      setChats(response.data);
    } catch (err) {
      setChats([]);
      setError("Error deleting todo");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChats()
        .then(setChats)
        .catch((error) => {
          setChats([]);
          setError("Something went wrong while searching for my chats...");
        });
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const output = () => {
    if (error) {
      return <div>{error}</div>;
    } else if (chats) {
      return (
        <div>
          {chats.map((item) => {
            return (
              <>
                <i>
                  <b>{item.user}</b> wrote at{" "}
                  {item.timeStamp.toString().split("T")[0]} on{" "}
                  {item.timeStamp.toString().split("T")[1].substring(0, 8)}{" "}
                  {parseInt(
                    item.timeStamp.toString().split("T")[1].substring(0, 8),
                    10
                  ) >= 12
                    ? "PM"
                    : "AM"}
                </i>
                <div className="chat-box">
                  <div className="chat">
                    <span key={item._id}>{item.text}</span>
                  </div>
                  <div ref={bottomRef} />
                  <button
                    className="Delete_Button"
                    onClick={() => deleteChat(item)}
                  >
                    {" "}
                    <BsTrash />{" "}
                  </button>
                </div>
              </>
            );
          })}
        </div>
      );
    } else <div>'Waiting for chats'</div>;
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <br />
          ChatUp
          <button className="toggle-button" onClick={toggleTheme}>Mode</button>
        </div>
        <div className="Output-box">{output()}</div>

        <div className="Bottom_Field">
          <input
            className="input-user"
            placeholder={`User`}
            minLength={1}
            maxLength={20}
            type="text"
            value={chatUser}
            onChange={(e) => setChatUser(e.target.value)}
          />
          <br />
          <textarea
            className="input-message"
            rows={5}
            placeholder={`Message...`}
            minLength={1}
            maxLength={200}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <br />
          <button
            disabled={!Boolean(chatText && chatUser)}
            className="Create_Button"
            onClick={(e) => createChat(chatText, chatUser)}
          >
            Send
          </button>
        </div>
      </header>
    </div>
    </div>
  );
}

export default App;
