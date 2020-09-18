import React from 'react';

import styles from './NewMessage.module.css';

const NewMessage = ({ onSend, setMessage, message }) => {
  return (
    <div className={styles.New}>
      <input
        type='text'
        autoComplete='off'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Your message...'
        className={styles.Input}
        onKeyPress={(e) => (e.key === 'Enter' ? onSend(e) : null)}
      />
      <button type='submit' onClick={onSend} className={styles.Button}>
        Send
      </button>
    </div>
  );
};

export default NewMessage;
