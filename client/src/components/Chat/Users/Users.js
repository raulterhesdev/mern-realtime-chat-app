import React from 'react';
import User from './User/User';

const Users = ({ users, room }) => {
  return (
    <React.Fragment>
      {users.map((usr) => (
        <User key={usr.id} user={usr} room={room} />
      ))}
    </React.Fragment>
  );
};

export default Users;
