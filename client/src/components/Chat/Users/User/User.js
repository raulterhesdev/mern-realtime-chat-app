import React from 'react';

const User = ({ user, room }) => {
  return <div>{user.room === room ? user.name : null}</div>;
};

export default User;
