import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';

const RoomSelect = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [room, setRoom] = useState('');
  const [roomError, setRoomError] = useState(null);

  const checkValid = (e) => {
    let canSend = true;
    if (name === '') {
      canSend = false;
      setNameError('Please enter your name.');
    }
    if (room === '') {
      canSend = false;
      setRoomError('Please enter a room name.');
    }
    if (!canSend) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <h1>Welcome to Hazel Chat</h1>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Your name...'
        name='name'
        label='Name'
        errorMessage={nameError}
        onBlur={() =>
          name === '' ? setNameError('Please enter your name.') : null
        }
        onFocus={() => setNameError(null)}
        error={nameError ? true : false}
      />
      <TextInput
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder='Room Name'
        name='room'
        label='Room'
        errorMessage={roomError}
        onBlur={() =>
          room === '' ? setRoomError('Please enter your name.') : null
        }
        onFocus={() => setRoomError(null)}
        error={roomError ? true : false}
      />
      <Link
        onClick={checkValid}
        to={`/chat?name=${name}&room=${room}`}
        style={{ textDecoration: 'none' }}
      >
        <button type='submit'>Enter Chat!</button>
      </Link>
    </div>
  );
};

export default RoomSelect;
