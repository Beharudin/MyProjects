import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function TaskLists() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("Beharudin");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await axios.get("/task/").then((res) => {
          setTasks(res.data);
        });
      } catch (error) {
        console.log("my error", error);
      }
    };
    fetchTasks();
  }, []);

  const claimTask = async (id) => {
    try {
      await axios.post(`/task/${id}/claim`, { userId: user });
      await axios.get("/task/").then((res) => {
        setTasks(res.data);
      });
    } catch (error) {
      console.log("my error", error);
    }
  };

  const startTask = async () => {
    try {
      await axios
        .post(
          `process-definition/Process_0f1vjoj:2:708e26a5-d2ae-11ed-a18b-88a4c23100e3/start`,
          {
            variables: {
              name: {
                value: user,
                type: "string",
              },
              pwd: {
                value: 1234,
                type: "long",
              },
            },
            businessKey: "default",
          }
        );
      await axios.get("/task/").then((res) => {
        setTasks(res.data);
      });
    } catch (error) {
      console.log("my error", error);
    }
  };

  const handleOpenMytasks = () => {
    window.location.href = "/mytasks";
  }

  return (
    <div>
      <Container component="main" sx={{ mb: 4 }}>
        <div className="col col-1  d-flex justify-content-end">
          <Button
            style={{ textTransform: "none" }}
            onClick={startTask}
          >
            Start process
          </Button>
        </div>
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
            <Button variant="contained" style={{ textTransform: "none" }} onClick={handleOpenMytasks}>
              Mytasks
            </Button>
          </FormControl>
        </Paper>
        <Typography variant="h4">Task lists</Typography>
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
                        Assignee: {task.assignee ? task.assignee : "None"}
                      </Typography>
                    </div>
                  </div>
                  <div className="col col-1  d-flex justify-content-end">
                    <Button
                      style={{ textTransform: "none" }}
                      disabled={task.assignee}
                      onClick={() => claimTask(task.id)}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              </Box>
            </Paper>
          ))}
      </Container>
    </div>
  );
}

export default TaskLists;
