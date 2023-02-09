import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_BACKEND_URL, BASE_CAMADPTR_URL, cookies } from '../..';
import axios from 'axios';
import { uiActions } from '../../store/ui';
import { useEffect, useState } from 'react';

const ListTask = ({ list, setList, reloadTasks }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = useState(false);
  const [assignee, setAssignee] = useState(null);
  const [subordinates, setSubordinates] = useState([]);
  const userId = cookies.get('userId');

  const claimHandler = async (e) => {
    try {
      const id = e.target.id.split('ID-')[1];
      dispatch(uiActions.startLoad());
      const url = `${BASE_CAMADPTR_URL}/claimTask?taskId=${id}&userId=${userId}`;
      await axios.get(url);
      dispatch(
        uiActions.notif({ type: 'success', msg: 'Task claimed successfully' })
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
  const assignHandler = async (e) => {
    try {
      e.preventDefault();
      const uid = subordinates
        .filter((el) => el.email === assignee)
        .map((el) => el.id)[0];
      const tid = e.target.id.split('ID-')[1];
      const url = `${BASE_CAMADPTR_URL}/assignTask?taskId=${tid}&userId=${uid}`;
      setOpen(false);
      dispatch(uiActions.startLoad());
      await axios.get(url);
      dispatch(
        uiActions.notif({ type: 'success', msg: 'Task assigned successfully' })
      );
      reloadTasks();
      dispatch(uiActions.stopLoad());
    } catch (err) {}
  };

  const handleClickOpen = () => {
    setAssignee(null);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const loadSubordinates = async () => {
    try {
      dispatch(uiActions.startLoad());
      const url = `${BASE_BACKEND_URL}/getSubordinates?userId=${userId}`;
      const resp = await axios.get(url);
      setSubordinates(resp.data);
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
  useEffect(() => {
    loadSubordinates();
  }, [dispatch]);

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
              <Button
                id={`ID-${el.taskId}`}
                aria-label='claim'
                onClick={claimHandler}
                variant='outlined'
                color='primary'
              >
                Claim
              </Button>

              <Button
                id={`ID-${el.taskId}`}
                aria-label='assign'
                onClick={handleClickOpen}
                variant='outlined'
                color='secondary'
                sx={{ marginLeft: 2 }}
                disabled={userData.role != 'manager'}
              >
                Assign To
              </Button>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select asignee</DialogTitle>
                <DialogContent>
                  <Box
                    component='form'
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                  >
                    <FormControl name='assignee' sx={{ m: 1, minWidth: 120 }}>
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        name='assignee'
                        options={subordinates.map((el) => el.email)}
                        onChange={(e, val) => setAssignee(val)}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            name='assignee'
                            {...params}
                            label='email'
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    id={`ID-${el.taskId}`}
                    color='error'
                    onClick={(e) => (assignee ? assignHandler(e) : '')}
                  >
                    confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
};
export default ListTask;
