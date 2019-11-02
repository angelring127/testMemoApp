import React from 'react';
import './Header.css';

const Header = (props) => (
  <div className="Header">
      {props.title}
  </div>
)

export default Header;