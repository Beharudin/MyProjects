import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "./Loader";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cookies } from "../..";
import { loginUser, verifyToken } from "../../store/auth/authActions";
import Notifications from "../../components/common/Notifications";

let notFirstTime = false;

function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const redirectPath = location.state ? location.state.path : "/admin";

  useEffect(() => {
    const token = cookies.get("token");
    if (!notFirstTime && token) {
      notFirstTime = true;
      dispatch(verifyToken(token, navigate, redirectPath));
    }
  }, [notFirstTime, isLoggedIn, dispatch]);

  const initialValues = {
    userEmail: "",
    userPwd: "",
  };

  const aboutInitSchema = Yup.object().shape({
    userEmail: Yup.string().required("Email is required"),
    userPwd: Yup.string().required("Password is required"),
  });

  async function loginHandler(email, pwd) {
    setLoading(true);
    const userCridentials = {
      email: email,
      password: pwd,
    };

    try {
      setLoading(true);
      dispatch(loginUser(userCridentials, navigate, redirectPath));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: "100%" }}>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black m-5"
                style={{ borderRadius: "25px" }}
              >
                {notification && (
                <Notifications
                  type={notification.type}
                  message={notification.message}
                />
              )}
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                        Login
                      </p>

                      <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={aboutInitSchema}
                        validateOnMount={true}
                        onSubmit={(values) => {
                          loginHandler(values.userEmail, values.userPwd);
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                        }) => (
                          <Form>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <div className="d-flex flex-row align-items-center">
                                  <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="fa-lg me-3 fa-fw"
                                  />
                                  <TextField
                                    required
                                    id="userEmail"
                                    name="userEmail"
                                    label="Email"
                                    value={values.userEmail}
                                    multiline
                                    maxRows={10}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange("userEmail")}
                                    onBlur={handleBlur("userEmail")}
                                    sx={{ p: 2 }}
                                  />
                                </div>
                                {touched.userEmail && errors.userEmail && (
                                  <p
                                    style={{ color: "red", marginLeft: "40px" }}
                                  >
                                    {errors.userEmail}
                                  </p>
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                <div className="d-flex flex-row align-items-center">
                                  <FontAwesomeIcon
                                    icon={faLock}
                                    className="fa-lg me-3 fa-fw"
                                  />
                                  <TextField
                                    required
                                    id="userPwd"
                                    name="userPwd"
                                    label="password"
                                    value={values.userPwd}
                                    multiline
                                    maxRows={10}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange("userPwd")}
                                    onBlur={handleBlur("userPwd")}
                                    sx={{ p: 2 }}
                                  />
                                </div>
                                {touched.userPwd && errors.userPwd && (
                                  <p
                                    style={{ color: "red", marginLeft: "40px" }}
                                  >
                                    {errors.userPwd}
                                  </p>
                                )}
                              </Grid>
                            </Grid>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                              >
                                Login
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="../../images/mohammed.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Login;
