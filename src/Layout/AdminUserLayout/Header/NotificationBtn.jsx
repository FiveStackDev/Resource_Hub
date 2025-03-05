import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 3,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      fontSize:'12px'
    },
  }));

function NotificationBtn(){
    return(
    <IconButton aria-label="cart" className="menu">
      <StyledBadge  badgeContent={10} color="secondary" >
        <NotificationsIcon />
      </StyledBadge>
    </IconButton>
    )
}

export default NotificationBtn