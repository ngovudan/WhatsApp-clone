import React, { useEffect, useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('8405b5eb0077133c67ac', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe("messages");
    channel.bind('inserted', (newMessages) => {
      // alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages])
    });

    return () => {
        channel.unbind_all()
        channel.unsubscribe()
    }
  }, [messages])

  return (
    <div className='app'>
      <div className='app_body'>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
