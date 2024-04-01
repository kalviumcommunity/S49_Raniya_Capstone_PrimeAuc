import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/path">
          <img src="" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="login-container">
        {/* <Link to="/help" >Help</Link> */}
        <Link to="/login" className="login-link"> <button className="login-button">Log IN</button></Link>
      </div>
    </header>
  );
};

export default Header;
