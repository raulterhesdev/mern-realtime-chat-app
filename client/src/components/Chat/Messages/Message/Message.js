import React from 'react';

import styles from './Message.module.css';

const Message = ({ data, name }) => {
  return (
    <div
      className={styles.Message}
      style={{
        alignSelf: data.name === name ? 'flex-end' : 'flex-start',
      }}
    >
      <p
        className={styles.Text}
        style={{
          backgroundColor:
            data.name === name ? 'var(--primary)' : 'var(--secondary)',
        }}
      >
        {data.text}
      </p>
      <div className={styles.Info}>
        <p>{data.time}</p>
        <p>{data.name}</p>
      </div>
    </div>
  );
};

export default Message;
