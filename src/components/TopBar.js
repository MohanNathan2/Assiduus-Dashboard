import React from 'react';
import { AppBar, Toolbar, InputBase, Avatar, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssiduusGlobalLogo from '../img/Assiduus_Global_Logo.jpg';
import Login from '../img/login.jpg' // Import the image
import '../App.css';


const TopBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{backgroundColor:'white'}}>
      <img src={AssiduusGlobalLogo} width={'100px'} alt="Assiduus Global Logo" /> {/* Use the imported image */}
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 , marginLeft:'70%' }}>
        <IconButton color="inherit" style={{zIndex:'999'}}>
            <SearchIcon />
          </IconButton>
          <InputBase
            style={{ border:'1px solid whitesmoke' , borderRadius:'4px' , marginLeft:'-40px' ,backgroundColor:'whitesmoke'}}
          />

        </div>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls="user-menu"
          aria-haspopup="true"
        >
          <Avatar src={Login} />
        </IconButton>
      </Toolbar>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopBar;
