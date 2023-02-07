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
import { useEffect } from 'react';

import HistoryIcon from '@mui/icons-material/History';
import MapIcon from '@mui/icons-material/Map';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WorkIcon from '@mui/icons-material/Work';
import { FormModal } from '../formModal/FormModal';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import StyledDiv from './shakeNotification';
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

export default function SideDrawer({ reloadDrawerOptions, props, children }) {
  const [open, setOpen] = React.useState(false);
  const [bodyOption, setBodyOption] = React.useState('dashboard');
  const [drawerOptions, setDrawerOptions] = React.useState([]);

  const isPending = useSelector((state) => state.ui.isLoading);
  const notifType = useSelector((state) => state.ui.notif.type);
  const userData = useSelector((state) => state.auth.userData);
  const optionals = [
    { text: 'New Loan', icon: [<AddCircleIcon />] },
    { text: 'See Loan Status', icon: [<MapIcon />] },
    { text: 'History', icon: [<HistoryIcon />] },
    { text: 'Task list', icon: [<PlaylistAddIcon />] },
    { text: 'My tasks', icon: [<PlaylistAddCheckIcon />] },
    { text: 'Actions', icon: [<NotificationsIcon />] },
    {
      text: 'Actions',
      icon: [
        <StyledDiv>
          <span className='rise-shake'>
            <NotificationsActiveIcon color='error' />
          </span>
        </StyledDiv>,
      ],
    },
    { text: 'Tasks for my cases', icon: [<WorkIcon />] },
  ];

  useEffect(() => {
    const options = [];
    if (userData.role === 'customer') {
      userData?.pId ? options.push(optionals[1]) : options.push(optionals[0]);
      userData?.taskId ? options.push(optionals[6]) : (() => {})();
      options.push(optionals[2]);
    } else {
      options.push(optionals[3], optionals[4], optionals[7]);
    }
    setDrawerOptions(options);
  }, [userData]);

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
      <Box sx={{ width: '100%' }}>
        {notifType && children[0]}
        {isPending && children[1]}
        {bodyOption && bodyOption === 'New Loan' && (
          <NewLoan
            reloadDrawerOptions={reloadDrawerOptions}
            reloadBodyOption={setBodyOption}
            resetBackground={setToDashboard}
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
        {bodyOption && bodyOption === 'Tasks for my cases' && (
          <TaskList show='caseTasks' props={props} />
        )}
        {bodyOption && bodyOption === 'Actions' && (
          <FormModal
            resetBackground={setToDashboard}
            taskId={userData.taskId}
            taskDesc={userData.taskDesc}
          />
        )}
      </Box>
    </Container>
  );
}
