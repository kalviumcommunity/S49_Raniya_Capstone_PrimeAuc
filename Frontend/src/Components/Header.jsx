import React, { useState,useEffect } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { Button, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar,AppBar, IconButton, Menu, MenuItem,Divider,
  Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/background.jpg"; 
import sellBackgroundImage from "../assets/images/sellbackground.jpg"; 
import "../Styles/Header.css";
import default_profile from "../assets/images/defprof.jpg"
import { Sell as SellIcon, Gavel  as AuctionIcon, Help as HelpIcon, Dashboard as DashboardIcon, Logout as LogoutIcon, Login as LoginIcon } from '@mui/icons-material'; // Import specific icons



export default function App() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
   const [open, setOpen] = useState(false)

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

  const navigate = useNavigate(); // Instance of useNavigate

  // Check for existing login state (optional, based on your implementation)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      setIsLoggedIn(true);
    
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    localStorage.removeItem('username'); 
    localStorage.removeItem('userId'); 
    setIsLoggedIn(false);
    setOpen(false);
    navigate('/'); // Redirect to home page after logout
  };

const toggleDrawer = (open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }
  setOpen(open);
};
  return (
    <div className="app-container">
      <AppBar position="static" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            
            
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
            {isLoggedIn ? (
              <>
               
               <Avatar onClick={handleClick}  src={default_profile} />

              
              </>
            ) : (
              <Link to="/login">
                <button className='login-button'>LOG IN</button>
              </Link>
            )}
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
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} sx={{ mt: 6 }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleClose(); }}>Logout</MenuItem>       
      </Menu>



      <Drawer
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}


      >
       
<Toolbar sx={{"backgroundColor": '#333'}}>

     <img  onClick={toggleDrawer(false)}  src={logo} alt="Logo" className="logo small-logo" />
   
    </Toolbar> 
        <List>
          <ListItem button component={Link} to="/sell">
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary="Sell" />
          </ListItem>
          <Divider sx={{ backgroundColor: '#333' }}/>
          <ListItem button component={Link} to="/auctionitemlist">
            <ListItemIcon>
              <AuctionIcon />
            </ListItemIcon>
            <ListItemText primary="Auction" />
          </ListItem>
          <Divider sx={{ backgroundColor: '#333' }}/>
          <ListItem button component={Link} to="/help">
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="How it works" />
          </ListItem>
          <Divider sx={{ backgroundColor: '#333' }} />
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider sx={{ backgroundColor: '#333' }} />

          {isLoggedIn ? (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>

            
          ) : (
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>

        <Divider sx={{ backgroundColor: '#333' }} />

      </Drawer>
    </div>
  );
}


