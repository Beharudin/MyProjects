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
import TaskList from '../taskList/TaskList';
import { Badge, Container } from '@mui/material';
import { useEffect } from 'react';

import HistoryIcon from '@mui/icons-material/History';
import MapIcon from '@mui/icons-material/Map';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WorkIcon from '@mui/icons-material/Work';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { FormModal } from '../formModal/FormModal';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import StyledDiv from './shakeNotification';
import axios from 'axios';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import { Dashboard } from '../dashboard/Dashboard.js';
import LoanStatus from '../loanStatus/LoanStatus';
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
  reloadDrawerOptions,
  props,
  children,
  bodyOption,
  setBodyOption,
}) {
  const [open, setOpen] = React.useState(false);
  const [drawerOptions, setDrawerOptions] = React.useState([]);
  const [drawerState, setDrawerState] = React.useState(true);
  const userId = cookies.get('userId');

  const isPending = useSelector((state) => state.ui.isLoading);
  const notifType = useSelector((state) => state.ui.notif.type);
  const userData = useSelector((state) => state.auth.userData);
  const custOpts = [
    { text: 'New Personal Loan', icon: [<AddCircleIcon />] },
    { text: 'See Personal Loan Status', icon: [<MapIcon />] },
    { text: 'History', icon: [<HistoryIcon />] },
    {
      text: 'Actions pers',
      icon: [
        <StyledDiv>
          <span className='rise-shake'>
            <NotificationsActiveIcon color='error' />
          </span>
        </StyledDiv>,
      ],
    },
    { text: 'New Business Loan', icon: [<AddCircleIcon />] },
    { text: 'See Business Loan Status', icon: [<MapIcon />] },
    {
      text: 'Actions biz',
      icon: [
        <StyledDiv>
          <span className='rise-shake'>
            <NotificationsActiveIcon color='error' />
          </span>
        </StyledDiv>,
      ],
    },
  ];
  const staffOpts = [
    {
      text: 'Task list',
      icon: [<PlaylistAddIcon />],
      endpoint: 'getAllTasksForUser',
    },
    {
      text: 'My tasks',
      icon: [<PlaylistAddCheckIcon />],
      endpoint: 'getMyTasks',
    },
    {
      text: 'Tasks for my cases',
      icon: [<WorkIcon />],
      endpoint: 'getLoanOfficerTasks',
    },
    {
      text: 'Estimation tasks',
      icon: [<LocalAtmIcon />],
      endpoint: 'getEstimationTasks',
    },
  ];

  const loadTaskCounts = async () => {
    for (let el of staffOpts) {
      const resp = await axios.get(
        `${BASE_CAMADPTR_URL}/${el.endpoint}/count?userId=${userId}`
      );
      el.count = resp.data;
    }
  };
  const reloadTaskListCount = () => {
    setDrawerState(!drawerState);
  };
  useEffect(() => {
    (async () => {
      const options = [];
      if (userData.role === 'customer') {
        userData?.biz_pId
          ? options.push(custOpts[5])
          : options.push(custOpts[4]);
        userData?.biz_taskId ? options.push(custOpts[6]) : (() => {})();
        userData?.pers_pId
          ? options.push(custOpts[1])
          : options.push(custOpts[0]);
        userData?.pers_taskId ? options.push(custOpts[3]) : (() => {})();
        options.push(custOpts[2]);
      } else {
        await loadTaskCounts();
        options.push(...staffOpts);
      }
      setDrawerOptions(options);
    })();
  }, [userData, drawerState]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const setToDashboard = async () => {
    setBodyOption('dashboard');
  };
  const resetBackground = () => {
    setToDashboard();
    reloadTaskListCount();
  };

  return (
    <Container
      sx={{
        display: 'flex',
        backgroundImage: img,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        width: '100vw',
      }}
      maxWidth='xl'
    >
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerOptions.map(({ text, icon, count }) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    setBodyOption(text);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Badge
                      badgeContent={count && String(count)}
                      color={count && count === 0 ? 'primary' : 'error'}
                      disable
                    >
                      {icon}
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {notifType && children[0]}
        {isPending && children[1]}
        {bodyOption &&
          `${bodyOption.split(' ')[0]} ${bodyOption.split(' ')[2]}` ===
            'New Loan' && (
            <NewLoan
              reloadDrawerOptions={reloadDrawerOptions}
              reloadBodyOption={(args) => {
                setBodyOption(args);
              }}
              resetBackground={setToDashboard}
              props={props}
              loanType={bodyOption.split(' ')[1].toLowerCase()}
            />
          )}
        {bodyOption &&
          `${bodyOption.split(' ')[0]} ${bodyOption.split(' ')[2]} ${
            bodyOption.split(' ')[3]
          }` === 'See Loan Status' && (
            <LoanStatus
              props={props}
              loanType={bodyOption.split(' ')[1].toLowerCase()}
            />
          )}
        {bodyOption && bodyOption === 'Task list' && (
          <TaskList show='all' reloadTaskListCount={reloadTaskListCount} />
        )}
        {bodyOption && bodyOption === 'My tasks' && (
          <TaskList show='my' reloadTaskListCount={reloadTaskListCount} />
        )}
        {bodyOption && bodyOption === 'Tasks for my cases' && (
          <TaskList
            show='caseTasks'
            reloadTaskListCount={reloadTaskListCount}
          />
        )}
        {bodyOption && bodyOption === 'Estimation tasks' && (
          <TaskList
            show='estimationTasks'
            reloadTaskListCount={reloadTaskListCount}
          />
        )}
        {bodyOption && bodyOption === 'Actions biz' && (
          <FormModal
            resetBackground={resetBackground}
            taskId={userData.biz_taskId}
            taskDesc={userData.biz_taskDesc}
            loanType='business'
          />
        )}
        {bodyOption && bodyOption === 'Actions pers' && (
          <FormModal
            resetBackground={resetBackground}
            taskId={userData.pers_taskId}
            taskDesc={userData.pers_taskDesc}
            loanType='personal'
          />
        )}
        {bodyOption && bodyOption === 'dashboard' && (
          <Dashboard
            drawerOptions={drawerOptions}
            setBodyOption={(args) => {
              setBodyOption(args);
            }}
          />
        )}
      </Box>
    </Container>
  );
}
