import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/reservation">Reservation</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;