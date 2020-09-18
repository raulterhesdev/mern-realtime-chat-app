import React from 'react';

import styles from './User.module.css';

const User = ({ user, room }) => {
  return (
    <div className={styles.User}>
      <span></span>
      {user.room === room ? user.name : null}
    </div>
  );
};

export default User;
