import React from 'react';
import Message from './Message/Message';

const Messages = ({ messages, name }) => {
  return (
    <React.Fragment>
      {messages.map((msg) => (
        <Message data={msg} name={name} key={name + ' ' + msg.time} />
      ))}
    </React.Fragment>
  );
};

export default Messages;
