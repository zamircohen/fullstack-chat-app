import React, { useEffect, useState } from "react";
import ChatItem from '../../shared/src/chat-item';
import "./App.css";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
// import { AiOutlineEdit } from "react-icons/ai";

axios.defaults.baseURL = process.env.REACT_APP_TODO_API || 'http://localhost:3001'

const fetchChats = async (): Promise<ChatItem[]> => {
  const response = await axios.get<ChatItem[]>('/chats')
  return response.data
}

function App() {
  const [chatText, setChatText] = useState<string>('')
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  
  const createChat = async (chatText: string): Promise<void> => {
    const chatItem: ChatItem = {
      text: chatText,
      timeStamp: new Date()
    }
  
  try {
    await axios.post<ChatItem[]>('/chats', chatItem) 
    const response = await axios.get<ChatItem[]>('/chats')
    setChats(response.data)
    setChatText('')
  } catch (err) {
    setChats([])
    setError('Error creating chat')
  }
  }

  const deleteChat = async (chat: ChatItem): Promise<void> => {
    try {
      await axios.delete<ChatItem[]>(`/chats/${chat._id}`)
      const response = await axios.get<ChatItem[]>('/chats')
      setChats(response.data)
    } catch (err) {
      setChats([])
      setError('Error deleting todo')
    }
  }

  
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchChats()
        .then(setChats)
        .catch((error) => {
          setChats([])
          setError('Something went wrong while searching for my chats...')
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const output = () => {
    if (error) {
      return (<div>{error}</div>)
    } else if (chats) {
      return (<div>{
        chats.map((item) => {
          return (
            <>
            <div className="Todo">
            <span key={item._id}>{item.text} 
            <button className="Delete_Button" onClick={() => deleteChat(item)}> < BsTrash/> </button> 
            {/* <button className="Edit_Button"> < AiOutlineEdit/> </button>
            <input type="text" name="popup" id="popup" className="hide"></input> <button name="popup" id="popup" className="hide">Edit</button> */}
            </span>
            </div>
            </>
          )
        })
        }</div>)
    } else 
      (<div>'Waiting for chats'</div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header">
        <br />
        My chats...
        </div>
        <div className="Output-box">
        {output()}
        </div>
      </header>
      <div className="Bottom_Field">
        <input className="Input_Field" placeholder={`Your new chat item...`} minLength={1} maxLength={20} type="text" value={chatText} onChange={(e) => setChatText(e.target.value)}/>
        <br />
        <button disabled={!chatText} className="Create_Button" onClick={(e) => createChat(chatText)}>Create todo</button>
      </div>
    </div>
  );
}

export default App;
