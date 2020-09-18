import React from 'react';
import User from './User/User';

const Users = ({ users, room }) => {
  return (
    <div style={{ display: 'flex', marginLeft: 12 }}>
      {users.map((usr) => (
        <User key={usr.id} user={usr} room={room} />
      ))}
    </div>
  );
};

export default Users;
