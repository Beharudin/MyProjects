import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_BACKEND_URL, BASE_CAMADPTR_URL, cookies } from '../..';
import { uiActions } from '../../store/ui';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SeeAllTasks from '../seeAllTasks/SeeAllTasks';
import MyTasks from '../myTasks/MyTasks';

const TaskList = ({ show, reloadTaskListCount }) => {
  const dispatch = useDispatch();
  const userId = cookies.get('userId');
  const [list, setList] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskGroups, setTaskGroups] = useState([]);

  const seeListHandler = (e) => {
    setList(tasks.filter((el) => el.taskDefId === e.target.id));
  };
  const loadTasks = async () => {
    try {
      dispatch(uiActions.startLoad());
      setList('');
      reloadTaskListCount();

      //get tasks
      const endpoint =
        show === 'all'
          ? 'getAllTasksForUser'
          : show === 'my'
          ? 'getMyTasks'
          : show === 'estimationTasks'
          ? 'getEstimationTasks'
          : 'getLoanOfficerTasks';
      const resp = await axios.get(
        `${BASE_CAMADPTR_URL}/${endpoint}?userId=${userId}`
      );
      let _tasks = resp.data;

      //get biz key for tasks
      for (let i = 0; i < _tasks.length; i++) {
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getBizId?pid=${_tasks[i].pid}`
        );
        _tasks[i] = { userId: resp2.data, ..._tasks[i] };
      }

      //load details
      const toRem = [];
      for (let i = 0; i < _tasks.length; i++) {
        const resp2 = await axios.get(
          `${BASE_BACKEND_URL}/getActiveAppForUser?userId=${_tasks[i].userId}`
        );
        resp2.data
          ? (_tasks[i] = { ..._tasks[i], details: resp2.data })
          : toRem.push(i);
      }
      // _tasks = _tasks.filter((el, i) => !toRem.includes(i));
      setTasks(_tasks);

      //group into taskDefIds
      let _taskGroups = _tasks.map((el) => el.taskDefId);
      _taskGroups = [...new Set(_taskGroups)];

      _taskGroups = _taskGroups.map((el) => ({
        id: el,
        name: _tasks.filter((_el) => _el.taskDefId === el)[0].name,
        desc: _tasks.filter((_el) => _el.taskDefId === el)[0].desc,
        num: _tasks.filter((_el) => _el.taskDefId === el).length,
      }));
      await setTaskGroups(_taskGroups);
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
    loadTasks();
  }, [dispatch]);
  return (
    <Box>
      {list && show === 'all' && (
        <SeeAllTasks reloadTasks={loadTasks} list={list} setList={setList} />
      )}
      {list && show === 'my' && (
        <MyTasks reloadTasks={loadTasks} list={list} setList={setList} />
      )}
      {list && (show === 'caseTasks' || show === 'estimationTasks') && (
        <MyTasks
          reloadTasks={loadTasks}
          list={list}
          setList={setList}
          disableUnclaim
        />
      )}
      {!list && (
        <Grid container>
          {taskGroups.map((el) => (
            <Grid item xs={6} sm={4} md={3}>
              <Card
                sx={{
                  margin: 3,
                  display: 'grid',
                  // height: '100%',
                }}
              >
                <CardContent>
                  <Typography variant='h5'>{el.name}</Typography>
                  <Typography variant='body2'>{el.desc}</Typography>
                  <br />
                  <Typography color='text.secondary'>
                    total: {el.num}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    alignItems: 'end',
                  }}
                >
                  <Button size='small' id={el.id} onClick={seeListHandler}>
                    List all{' '}
                    <ChevronRightIcon id={el.id} onClick={seeListHandler} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;
