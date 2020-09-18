import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';

import styles from './RoomSelect.module.css';

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
    <div className={styles.RoomSelect}>
      <div className={styles.Container}>
        <h1 className={styles.Title}>Welcome to HazelChat!</h1>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='name'
          label='Name'
          errorMessage={nameError}
          onBlur={() =>
            name === '' ? setNameError('Please enter your name.') : null
          }
          onFocus={() => setNameError(null)}
          error={nameError ? true : false}
          style={{
            minWidth: 300,
          }}
        />
        <TextInput
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          name='room'
          label='Room'
          errorMessage={roomError}
          onBlur={() =>
            room === '' ? setRoomError('Please enter your name.') : null
          }
          onFocus={() => setRoomError(null)}
          error={roomError ? true : false}
          style={{
            minWidth: 300,
          }}
        />
        <Link onClick={checkValid} to={`/chat?name=${name}&room=${room}`}>
          <button type='submit' className={styles.Button}>
            Enter Chat!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoomSelect;
