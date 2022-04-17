import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Divider, Typography } from '@material-ui/core';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';


const AccountMenu = ({ setSignupDialogOpen, setLoginDialogOpen, setSessionInfo }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenSignUp = () => {
        setSignupDialogOpen(true);
        setAnchorEl(null);
    }
    const handleLogin = () => {
        setLoginDialogOpen(true);
        setAnchorEl(null);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setSessionInfo({ status: undefined })
    }

    return (
        <div>
            <div>
                <Button
                    id="basic-button"
                    color="inherit"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <PersonIcon></PersonIcon>
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    placement="bottom-start"
                >
                    <MenuItem style={{ minWidth: "170px" }} onClick={handleOpenSignUp}>
                        <ListItemIcon>
                            <AddReactionIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle2">Sign Up</Typography>}></ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleLogin}>
                        <ListItemIcon>
                            <VpnKeyIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle2">Login</Typography>}></ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <MeetingRoomIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle2">Logout</Typography>}></ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SwitchAccountIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle2">My Account</Typography>}></ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <StorefrontIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle2">My Orders</Typography>}></ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default AccountMenu
