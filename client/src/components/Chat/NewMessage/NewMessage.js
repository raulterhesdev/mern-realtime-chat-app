import React from 'react';

import { Textarea, Pane, Button } from 'evergreen-ui';

const NewMessage = ({ onSend, setMessage, message }) => {
  return (
    <Pane display='flex'>
      <Textarea
        placeholder='Your message...'
        resize='none'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />

      <Button
        disabled={message === '' ? true : false}
        appearance='minimal'
        height='100%'
        paddingX={16}
        onClick={onSend}
      >
        Send
      </Button>
    </Pane>
  );
};

export default NewMessage;
