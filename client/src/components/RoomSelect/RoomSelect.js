import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Pane,
  Heading,
  TextInputField,
  Button,
  ArrowRightIcon,
} from 'evergreen-ui';

const RoomSelect = () => {
  const [name, setName] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(null);

  const checkValid = (e) => {
    let canSend = true;
    if (name === null) {
      canSend = false;
      setNameError('Please enter your name.');
    }
    if (room === null) {
      canSend = false;
      setRoomError('Please enter a room name.');
    }
    if (!canSend) {
      e.preventDefault();
    }
  };

  return (
    <Pane
      height='97vh'
      width='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='none'
      margin={0}
    >
      <Pane
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='center'
      >
        <Heading size={700} marginTop='default'>
          Welcome to Hazel Chat!
        </Heading>

        <TextInputField
          isInvalid={nameError ? true : false}
          label='Name'
          validationMessage={nameError}
          value={name}
          onChange={(e) => setName(e.target.value)}
          marginTop={40}
          width='100%'
          placeholder='Name...'
          onBlur={() =>
            name === null ? setNameError('Please enter your name.') : null
          }
          onFocus={() => setNameError(null)}
        />

        <TextInputField
          isInvalid={roomError ? true : false}
          label='Room'
          validationMessage={roomError}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          width='100%'
          placeholder='Room...'
          onBlur={() =>
            room === null ? setRoomError('Please enter your name.') : null
          }
          onFocus={() => setRoomError(null)}
        />

        <Pane marginX='auto' marginTop={16}>
          <Link
            onClick={checkValid}
            to={`/chat?name=${name}&room=${room}`}
            style={{ textDecoration: 'none' }}
          >
            <Button appearance='primary' height={40} iconAfter={ArrowRightIcon}>
              Enter Chat!
            </Button>
          </Link>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default RoomSelect;
