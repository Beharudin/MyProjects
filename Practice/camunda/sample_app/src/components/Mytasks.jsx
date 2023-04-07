import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Mytasks() {
    const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("Beharudin");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await axios.get(`/task?assignee=${user}`).then((res) => {
          setTasks(res.data);
        });
      } catch (error) {
        console.log("my error", error);
      }
    };
    fetchTasks();
  }, [user]);

  const unclaimTask = async (id) => {
    try {
      await axios.post(`/task/${id}/unclaim`, { userId: user });
      await axios.get(`/task?assignee=${user}`).then((res) => {
        setTasks(res.data);
      });
    } catch (error) {
      console.log("my error", error);
    }
  };

  const completeTask = async (id) => {
    try {
        await axios.post(`/task/${id}/complete`, { userId: user });
        await axios.get(`/task?assignee=${user}`).then((res) => {
            setTasks(res.data);
          });
    } catch (error) {
      console.log("my error", error);
    }
  };
  const handleOpenTasks = () => {
    window.location.href = "/";
  }

  return (
    <div>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 2, md: 1 },
            mx: { xs: 1, md: 2 },
            p: { md: 2 },
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: { xs: "100%", md: "80%" },
            display: "flex",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="User"
              onChange={handleChange}
            >
              <MenuItem value="Beharudin">Beharudin</MenuItem>
              <MenuItem value="Temam">Temam</MenuItem>
              <MenuItem value="Hunda">Hunda</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Button variant="contained" style={{ textTransform: "none" }} onClick={handleOpenTasks}>
              Alltasks
            </Button>
          </FormControl>
        </Paper>
        <Typography variant="h4">My tasks</Typography>
        {tasks &&
          tasks.map((task) => (
            <Paper
              variant="outlined"
              sx={{
                my: { xs: 2, md: 1 },
                mx: { xs: 1, md: 2 },
                p: { md: 2 },
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: { xs: "100%", md: "80%" },
              }}
            >
              <Box>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="col col-6">
                    <h1 className="user">
                      <Typography
                        variant="h4"
                        sx={{
                          zIndex: "2",
                          background: "#FFF",
                          display: "inline",
                          position: "relative",
                          padding: "0 15px",
                        }}
                      >
                        Task: {task.name}
                      </Typography>
                    </h1>
                    <div>
                      <Typography
                        sx={{
                          zIndex: "2",
                          background: "#FFF",
                          display: "inline",
                          position: "relative",
                          padding: "0 15px",
                        }}
                      >
                        Assignee: {task.assignee}
                      </Typography>
                    </div>
                  </div>
                  <div className="col col-1  d-flex justify-content-end">
                    <Button
                      style={{ textTransform: "none" }}
                      onClick={() => unclaimTask(task.id)}
                    >
                      Unclaim
                    </Button>
                    <Button
                      style={{ textTransform: "none" }}
                      onClick={() => completeTask(task.id)}
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              </Box>
            </Paper>
          ))}
          </Container>
    </div>
  )
}

export default Mytasks
