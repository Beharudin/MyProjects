import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";


let notFirstTime = false;

function Login() {
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [msg, setMsg] = useState("");
  // const userData = useSelector((state) => state.auth.userData);
  // const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation();

  const redirectPath=location.state ? location.state.path : '/';

  const initialValues = {
    userEmail: "",
    userPwd: "",
  };

  const aboutInitSchema = Yup.object().shape({
    userEmail: Yup.string().required("Email is required"),
    userPwd: Yup.string().required("Password is required"),
  });

  const loginHandler = async (email, pwd) => {
    notFirstTime = true;
    dispatch(login(email, pwd, redirectPath, navigate));
  };

  
  return (
    <div style={{ height: "100%" }}>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black m-5"
              style={{ borderRadius: "25px" }}
            >
              {/* {error && <Error message={msg} />} */}
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
                        loginHandler(
                          values.userEmail,
                          values.userPwd
                        );
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
                                <p style={{ color: "red", marginLeft: "40px" }}>
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
                                <p style={{ color: "red", marginLeft: "40px" }}>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )}  */}
    </div>
  );
}

export default Login;
