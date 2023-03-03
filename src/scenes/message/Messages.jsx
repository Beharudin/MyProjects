import {
  ArrowForwardIos,
  Circle,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import "./messages.css";

const Messages = () => {
  const [open, setOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("Could you tell me process to start?");

  const messages = [
    {
      isNewMessage: true,
      user: "Beharudin",
      email: "beharudin@gmail.com",
    },
    {
      isNewMessage: false,
      user: "Bini",
      email: "bini@gmail.com",
    },
    {
      isNewMessage: false,
      user: "Temam",
      email: "temam@gmail.com",
    },
  ];



  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        mb: 2,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="col col-xs-12 col-sm-3">
          <Header title="Messages" subtitle="Received customer messages" />
        </div>
      {messages && (
        <>
          {messages.map((message) => (
            <>
              <Paper
                variant="outlined"
                sx={{
                  my: { xs: 2, md: 1 },
                  mx: { xs: 1, md: 2 },
                  p: { md: 2 },
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <NavLink className="nav-link" onClick={handleOpen}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="col col-2">
                      <img
                        src="../assets/user.png"
                        alt=""
                        className="userImg"
                      />
                    </div>
                    <div className="col col-5">
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
                          {message.user}
                        </Typography>
                      </h1>
                      <div className="userMessage">
                        <Typography
                          sx={{
                            zIndex: "2",
                            background: "#FFF",
                            display: "inline",
                            position: "relative",
                            padding: "0 15px",
                          }}
                        >
                          {message.email}
                        </Typography>
                      </div>
                    </div>

                    <div className="col-4 d-flex justify-content-end">
                      <Circle
                        sx={{
                          color: message.isNewMessage ? "#00aeef" : "#bebebe",
                        }}
                      />
                    </div>
                    <div className="col col-1  d-flex justify-content-end">
                      <ArrowForwardIos sx={{ color: "#bebebe" }} />
                    </div>
                  </div>
                </NavLink>
              </Paper>
              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    ...style,
                    width: 400,
                  }}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <div className="col col-2">
                      <img
                        src="../assets/user.png"
                        alt=""
                        className="userImg"
                      />
                    </div>
                    <div className="col col-5">
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
                          {message.user}
                        </Typography>
                      </h1>
                      <div className="userMessage">
                        <Typography
                          sx={{
                            zIndex: "2",
                            background: "#FFF",
                            display: "inline",
                            position: "relative",
                            padding: "0 15px",
                          }}
                        >
                          {message.email}
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "scroll",
                      height: "50vh",
                    }}
                  >
                        <div className="messageReceived">
                          <p>{userMessage}</p>
                        </div>
                  </Paper>
                  <Box sx={{height: '40px', mb:4, mt:2, display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <TextField variant="filled" sx={{width: '80%',}} />
                    <Send fontSize="large" sx={{ml:1, color: '#00aeef'}}/>
                  </Box>
                </Box>
              </Modal>
            </>
          ))}
        </>
      )}
    </Container>
  );
};

export default Messages;
