import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/background.jpg"; 
import sellBackgroundImage from "../assets/images/sellbackground.jpg"; 
import "../Styles/Header.css";

export default function App() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getBackgroundImage = () => {
    if (location.pathname.startsWith('/sell') || location.pathname === '/help') {
      return sellBackgroundImage;
    }
    return backgroundImage; // Default background image
  };

  return (
    <div className="app-container">
      <AppBar position="static" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
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
            <Link to="/auctionitemlist">
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
              <h2>HOW IT WORKS</h2>
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
        <MenuItem onClick={handleClose} component={Link} to="/auctionitemlist">Auctions</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/sell">Sell</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/help">Help</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/login">Log In</MenuItem>
      </Menu>
    </div>
  );
}
