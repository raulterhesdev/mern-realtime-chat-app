import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { Link } from 'react-router-dom';

import Messages from './Messages/Messages';
import Users from './Users/Users';
import NewMessage from './NewMessage/NewMessage';

import styles from './Chat.module.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [botMessage, setBotMessage] = useState({});
  const ENDPOINT = 'http://localhost:5000/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('joinRoom', { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
    return () => socket.disconnect();
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('botMessage', (message) => {
      setBotMessage(message);
      setTimeout(() => {
        setBotMessage({});
      }, 3000);
    });

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomUsers', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message !== '') {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <div className={styles.Chat}>
      <div className={styles.Info}>
        <h1 className={styles.Room}>
          Room: <strong>{room}</strong>
        </h1>
        <Link to='/' className={styles.Link}>
          Leave Room
        </Link>
      </div>
      <div className={styles.ChatContainer}>
        <div className={botMessage.text ? styles.BotMessage : null}>
          <span>{botMessage.text}</span>
        </div>
        <div className={styles.MessagesContainer}>
          <Messages messages={messages} name={name} />
        </div>
      </div>
      <NewMessage
        onSend={sendMessage}
        setMessage={setMessage}
        message={message}
      />

      <div className={styles.UsersInfo}>
        <h3 className={styles.Room}>Logged users:</h3>
        <Users users={users} room={room} />
      </div>
    </div>
  );
};

export default Chat;
