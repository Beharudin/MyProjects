import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import axios from 'axios';
import { uiActions } from '../../store/ui';
import { FormModal } from '../formModal/FormModal';
import { useState } from 'react';

const MyTasks = ({ list, setList, reloadTasks, disableUnclaim }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [taskToPerform, setTaskToPerform] = useState('');
  const dispatch = useDispatch();
  const userId = cookies.get('userId');

  const unclaimHandler = async (e) => {
    try {
      const taskId = e.target.id.split('ID-')[1];
      dispatch(uiActions.startLoad());
      const url = `${BASE_CAMADPTR_URL}/unclaimTask?taskId=${taskId}&userId=${userId}`;
      await axios.get(url);
      dispatch(
        uiActions.notif({ type: 'success', msg: 'Task unclaimed successfully' })
      );
      reloadTasks();
      dispatch(uiActions.stopLoad());
    } catch (err) {
      dispatch(uiActions.stopLoad());
      const msg = err.response?.data?.error;
      dispatch(
        uiActions.notif({
          type: 'error',
          msg,
        })
      );
    }
  };
  const completeHandler = async (e) => {
    try {
      const taskId = e.target.id.split('ID-')[1];
      setTaskToPerform(taskId);
      return;
    } catch (err) {}
  };
  const resetCompleteTask = (e) => {
    setTaskToPerform(null);
    reloadTasks();
  };

  const backHandler = () => setList('');
  return (
    <>
      <Button onClick={backHandler} sx={{ margin: 2 }}>
        <ChevronLeftIcon />
        back
      </Button>
      <Grid container display='flex'>
        {list.map((el) => (
          <Card xs='3' sx={{ margin: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'red[500]' }} aria-label='recipe'>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title={`requester: ${el.details?.cust?.full_name || 'John Doe'}`}
              subheader={`${new Date(
                el.details?.created_at
              ).getDay()}-${new Date(
                el.details?.created_at
              ).getDate()}-${new Date(el.details?.created_at).getFullYear()}`}
            />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                amount: {el.details?.loan_amount}
                <br />
                purpose: {el.details?.loan_purpose}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {!disableUnclaim && (
                <Button
                  id={`ID-${el.taskId}`}
                  aria-label='claim'
                  onClick={unclaimHandler}
                  variant='outlined'
                  color='primary'
                >
                  Unclaim
                </Button>
              )}
              {userData.role === 'staff' && (
                <Button
                  id={`ID-${el.taskId}`}
                  aria-label='assign'
                  onClick={completeHandler}
                  variant='outlined'
                  color='secondary'
                  sx={{ marginLeft: 2 }}
                >
                  Complete
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Grid>
      {taskToPerform && (
        <FormModal resetBackground={resetCompleteTask} taskId={taskToPerform} />
      )}
    </>
  );
};
export default MyTasks;
