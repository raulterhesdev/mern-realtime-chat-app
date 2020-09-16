import React from 'react';

import TextInput from '../../TextInput/TextInput';

const NewMessage = ({ onSend, setMessage, message }) => {
  return (
    <div>
      <TextInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Your message...'
      />
      <button type='submit' onClick={onSend}>
        Send
      </button>
    </div>
    // <Container
    //   style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Input
    //     placeholder='Your message...'
    //     onChange={(e) => setMessage(e.target.value)}
    //     value={message}
    //     style={{ width: '90%', marginRight: 8 }}
    //     color='primary'
    //   />
    //   <Button
    //     variant='contained'
    //     color='primary'
    //     endIcon={<Icon>send</Icon>}
    //     onClick={onSend}
    //   >
    //     Send
    //   </Button>
    // </Container>
    // <Pane display='flex'>
    //   <Textarea
    //     placeholder='Your message...'
    //     resize='none'
    //     onChange={(e) => setMessage(e.target.value)}
    //     value={message}
    //   />

    //   <Button
    //     disabled={message === '' ? true : false}
    //     appearance='minimal'
    //     height='100%'
    //     paddingX={16}
    //     onClick={onSend}
    //   >
    //     Send
    //   </Button>
    // </Pane>
  );
};

export default NewMessage;
