import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Importing icons
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Import the useNavigate hook
import { useNavigate } from 'react-router-dom';

const settings = [
  { name: 'Profile', icon: <PersonIcon /> },
  { name: 'Settings', icon: <SettingsIcon /> },
  { name: 'Logout', icon: <LogoutIcon /> }
];

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();  

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login');  
    handleCloseMenu();  
  };

  const name = "Minul Chathumal";
  const email = "minulck@gamil.com";

  return (
    <Box sx={{
        backgroundColor: 'rgb(255,255,255,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65px',
        width: '244px',
        borderRadius: '10px',
      }}>
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 0 }}>
          <Avatar sx={{
            height:'50px',
            width:'50px'
          }} alt="User Avatar" src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=" />
          <Box sx={{ ml: 1, textAlign: 'left' }}>
            <Typography sx={{ fontSize: '14px', color: 'rgb(255,255,255)', fontWeight: 'bold' }}>{name}</Typography>
            <Typography sx={{ fontSize: '12px', color: 'rgb(255,255,255,0.6)' }}>{email}</Typography>
          </Box>
          <ArrowDropDownIcon 
            sx={{ color: '#ffffff', fontSize: '40px', cursor: 'pointer' }} 
            onClick={handleOpenMenu} 
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '30px' }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {settings.map((setting) => (
          <MenuItem 
            key={setting.name} 
            onClick={setting.name === 'Logout' ? handleLogout : handleCloseMenu} 
            sx={{display:'flex', justifyContent:'center', width:'220px'}}
          >
            {setting.icon}
            <Typography sx={{ textAlign: 'center', width:'150px' }}>
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Profile;
