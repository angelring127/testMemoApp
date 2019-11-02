import React from 'react';

function Avatar(props) {
  return (
    <div className="Avatar">
      <img src={props.user.avatarUrl}
        alt={props.user.userName}
      />
    </div>
  );
}

export default Avatar;