import React, { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import './Chat.css'
import axios from '../axios'

function Chat({ messages }) {
    const [input, setInput] = useState("")
    
    const sendMessage = (e) => {
        e.preventDefault()

        axios.post('/messages/new', {
            message: input,
            name: 'VDan',
            timestamp: 'Just now!',
            received: true
        })
        setInput('')
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar />

                <div className='chat_headerInfo'>
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((message, index) => (
                    <p key={index} className={`chat_message ${message.received && 'chat_reciever'}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className='chat_footer'>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input onChange={e => setInput(e.target.value)} value={input} placeholder='Tyoe a message' type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>

            </div>
        </div>
    )
}

export default Chat
