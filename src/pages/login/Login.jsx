import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { uiActions } from "../../store/ui";
import Notify from "../../components/notify/Notify";
import SpinLoader from "../../components/spinloader/SpinLoader";
import { Navigate } from "react-router-dom";
import { sbActions } from "../../store/sidebar";
import { _host, cookies, BASE_AUTH_URL } from "../../index.js";
import Topbar from "../../components/topbar/Topbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
let notFirstTime = false;
let data = {};

const unameIsValid = async (uname) => {
  return true;
};

const Login = () => {
  const _path = window.location.pathname;
  const [path, setPath] = React.useState(_path);
  const toggleLoginPage = () => {
    setPath(path === "/login" || path === "/Login" ? "/staff/login" : "/login");
  };

  useEffect(() => {
    <Navigate to={path} replace />;
  }, [path]);

  const dispatch = useDispatch();
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.accessToken);
  const isPending = useSelector((state) => state.ui.isLoading);

  const handleSubmit = async (event) => {
    notFirstTime = true;
    event.preventDefault();
    data = new FormData(event.currentTarget);
    data = {
      uname: data.get("uname"),
      password: data.get("password"),
    };
    //on submit validation
    if (!(await unameIsValid(data.uname))) {
      dispatch(uiActions.notif({ type: "error", msg: "invalid username" }));
    } else {
      dispatch(uiActions.notif({ type: "", msg: "" }));
      dispatch(uiActions.startLoad());
    }
  };

  useEffect(() => {
    //auth&admin at front-end.port + 1 && zkt basic/hr/ at front-end.port + 2 && finance at front-end.port + 3
    const token = cookies.get("token");
    if (!notFirstTime && token) {
      notFirstTime = true;
      //auth is at front-end.port + 1
      axios
        .post(`${BASE_AUTH_URL}/verifyToken?token=${token}&middleware=0`)
        .then(function (response) {
          // handle success
          dispatch(uiActions.stopLoad());
          dispatch(
            authActions.login({
              userData: response.data.userData,
              accessToken: response.data.accessToken,
            })
          );

          dispatch(sbActions.switch({ option: "dashboard" }));
        })
        .catch(function (error) {
          dispatch(uiActions.stopLoad());
        });
    }
  }, [notFirstTime, isLoggedIn, isPending, dispatch]);

  useEffect(() => {
    //auth&admin at front-end.port + 1 && zkt basic/hr/ at front-end.port + 2 && finance at front-end.port + 3
    if (notFirstTime && isPending) {
      const url = `${BASE_AUTH_URL}${path}`;
      //auth is at front-end.port + 1

      axios
        .post(url, {
          uname: data.uname,
          password: data.password,
        })
        .then(function (response) {
          // handle success
          dispatch(uiActions.stopLoad());
          dispatch(
            authActions.login({
              userData: response.data.userData,
              accessToken: response.data.accessToken,
            })
          );
          cookies.set("token", response.data.accessToken, { path: "/" });
          cookies.set("role", response.data.userData.role, { path: "/" });
          cookies.set("userId", response.data.userData.id, { path: "/" });
        })
        .catch(function (error) {
          dispatch(uiActions.stopLoad());

          // handle error
          if (error?.response?.data && error?.response?.data?.error) {
            dispatch(authActions.logout());

            dispatch(
              uiActions.notif({
                type: "error",
                msg: error.response.data.error,
              })
            );
          } else {
            console.log(error);
            dispatch(authActions.logout());
            dispatch(
              uiActions.notif({
                type: "error",
                msg: "check your internet connection",
              })
            );
          }
        });
    }
  }, [notFirstTime, isLoggedIn, isPending, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Topbar />
      {token && userData.role === "admin" && <Navigate to="/admin" replace />}
      {token && userData.role === "customer" && <Navigate to="/home" replace />}
      <Container
        component="main"
        maxWidth="xs"
        style={{ bacgroundColor: "black" }}
      >
        {errType && <Notify />}
        <CssBaseline />
        {isPending && <SpinLoader />}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon onClick={toggleLoginPage} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id={path === "/login" || path === "/Login" ? "mobile" : "email"}
              label={
                path === "/login" || path === "/Login" ? "mobile" : "email"
              }
              name="uname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
//- call veirfy as a middleware on every protected endpoint in each project
