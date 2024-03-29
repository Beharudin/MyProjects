import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { cookies } from '../../index.js';
import { authActions } from '../../store/auth.js';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Header = ({ setBodyOption, bodyOption }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    cookies.remove('token');
    cookies.remove('role');
    dispatch(authActions.logout());
  };

  const setToDashboard = () => setBodyOption('dashboard');
  return (
    <>
      <AppBar
        sx={{
          position: 'fixed',
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 30%, rgba(9,24,131,1) 56%, rgba(8,38,140,1) 74%, rgba(0,212,255,1) 100%)',
        }}
      >
        <Toolbar>
          <Grid container>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                sx={{ marginLeft: 8 }}
                color='inherit'
                onClick={setToDashboard}
              >
                <HomeIcon />
              </IconButton>
              {bodyOption && (
                <>
                  <ChevronRightIcon color='inherit' />
                  {bodyOption}
                </>
              )}
            </Box>
            <Tooltip
              item
              sx={{ marginLeft: 'auto' }}
              xs={9}
              title='Account settings'
            >
              <IconButton
                onClick={handleClick}
                size='small'
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize='small' />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={logoutHandler}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* <Offset /> */}
    </>
  );
};

export default Header;
