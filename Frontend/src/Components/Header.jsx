import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/navbar.jpg"; // Import your background image
import "../Styles/Header.css";

export default function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="app-container">
      <AppBar position="static" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <div className="navbar-brand">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo small-logo" />
            </Link>
          </div>

          <div className="navbar-item">
            <Link to="/auction">
              <h2>AUCTIONS</h2>
            </Link>
            </div> 
            <div className="navbar-item">
            <Link to="/sell">
              <h2>SELL</h2>
            </Link>
          </div>

          <div className="navbar-item">
            <Link to="/help">
              <h2>HELP</h2>
            </Link>
          </div>
          <div className="navbar-end">
            <Link to="/login">
              <button className='login-button'>LOG IN</button>
            </Link>
          </div>
         

        </Toolbar>
      </AppBar>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/auctions">Auctions</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/sell">Sell</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/help">Help</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/login">Log In</MenuItem>
      </Menu>
    </div>
  );
}
