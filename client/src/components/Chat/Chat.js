import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import {
  ArrowLeftIcon,
  Heading,
  Pane,
  Strong,
  Button,
  Card,
} from 'evergreen-ui';
import { Link } from 'react-router-dom';

import Messages from './Messages/Messages';
import Users from './Users/Users';
import NewMessage from './NewMessage/NewMessage';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();
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

    if (message) {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <Pane
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-start'
    >
      <Heading size={700} marginTop='default'>
        Welcome!
      </Heading>
      <Heading size={500} marginTop={8}>
        Room: <Strong size={600}>{room}</Strong>
      </Heading>
      <Pane display='flex' justifyContent='flex-end'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button appearance='minimal' height={40} iconBefore={ArrowLeftIcon}>
            Leave Room
          </Button>
        </Link>
      </Pane>
      <Pane
        display='flex'
        flexWrap='wrap'
        width='90%'
        marginX='auto'
        marginTop={16}
      >
        <Pane>
          <Users users={users} room={room} />
        </Pane>
        <Pane
          width='80%'
          minHeight='50vh'
          minWidth={300}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          marginX='auto'
          position='relative'
        >
          <Card position='absolute' top='0' left='40%'>
            <Heading>{botMessage ? botMessage.text : null}</Heading>
          </Card>
          <Messages messages={messages} name={name} />
          <NewMessage
            onSend={sendMessage}
            setMessage={setMessage}
            message={message}
          />
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Chat;
