import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NewLoan from '../newLoan/NewLoan';
import { useSelector } from 'react-redux';
import LoanStatus from '../loanStatus/LoanStatus';
import TaskList from '../taskList/TaskList';
import { Container } from '@mui/material';
const img = "url('/img/Pattern.svg')";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function SideDrawer({
  drawerOptions,
  reloadDrawerOptions,
  props,
  children,
}) {
  const [open, setOpen] = React.useState(false);
  const [bodyOption, setBodyOption] = React.useState('dashboard');
  const isPending = useSelector((state) => state.ui.isLoading);
  const notifType = useSelector((state) => state.ui.notif.type);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const setToDashboard = async () => {
    setBodyOption('dashboard');
  };
  return (
    <Container
      sx={{
        display: 'flex',
        backgroundImage: img,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
      }}
      maxWidth='xl'
    >
      <Box>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerOptions.map(({ text, icon }) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => setBodyOption(text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box width='100%'>
        {notifType && children[0]}
        {isPending && children[1]}
        {bodyOption && bodyOption === 'New Loan' && (
          <NewLoan
            reloadDrawerOptions={reloadDrawerOptions}
            reloadBodyOption={setBodyOption}
            setToDashboard={setToDashboard}
            props={props}
          />
        )}
        {bodyOption && bodyOption === 'See Loan Status' && (
          <LoanStatus props={props} />
        )}
        {bodyOption && bodyOption === 'Task list' && (
          <TaskList show='all' props={props} />
        )}
        {bodyOption && bodyOption === 'My tasks' && (
          <TaskList show='my' props={props} />
        )}
      </Box>
    </Container>
  );
}
