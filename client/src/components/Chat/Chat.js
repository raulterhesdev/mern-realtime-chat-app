import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { Link } from 'react-router-dom';

import Messages from './Messages/Messages';
import Users from './Users/Users';
import NewMessage from './NewMessage/NewMessage';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      name: 'test',
      time: '3:47:9 pm',
      text: 'tetwgwegwegweg',
    },
    {
      name: 'weg',
      time: '3:47:10 pm',
      text: 'tetwgwegwegweg',
    },
  ]);
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
    <div>
      <div>
        <h1>Room: {room}</h1>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span>Leave Room</span>
        </Link>
      </div>
      <div>
        <h3>Logged users:</h3>
        <Users users={users} room={room} />
      </div>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>{botMessage.text}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '100%',
            height: '70vh',
            overflowY: 'scroll',
          }}
        >
          <Messages messages={messages} name={name} />
        </div>
        <NewMessage
          onSend={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </div>
    // <Container
    //   maxWidth='md'
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '97vh',
    //   }}
    // >
    //   <Paper>
    //     <Typography>Welcome {name}!</Typography>
    //     <Typography>Room: {room}</Typography>
    //     <Link to='/' style={{ textDecoration: 'none' }}>
    //       <Button variant='contained' color='primary'>
    //         Leave Room!
    //       </Button>
    //     </Link>
    //   </Paper>
    //   <Paper
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'flex-end',
    //       width: '100%',
    //       height: '70vh',
    //       overflowY: 'scroll',
    //     }}
    //   >
    //     <Messages messages={messages} name={name} />
    //     <NewMessage
    //       onSend={sendMessage}
    //       setMessage={setMessage}
    //       message={message}
    //     />
    //   </Paper>
    //   <Accordion>
    //     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //       <Typography>Logged users</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Users users={users} room={room} />
    //     </AccordionDetails>
    //   </Accordion>
    // </Container>
  );
};

export default Chat;
